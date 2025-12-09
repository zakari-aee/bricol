import React from 'react';
import { Check, CheckCheck, Bot, User, Clock, MapPin, DollarSign, Users } from 'lucide-react';

const MessageBubble = ({ message, onQuickReply, onSuggestWorker }) => {
  const isAI = message.sender === 'ai';
  const isUser = message.sender === 'user';
  const timeString = new Date(message.timestamp).toLocaleTimeString('ar-MA', {
    hour: '2-digit',
    minute: '2-digit'
  });

  const renderContent = () => {
    switch (message.type) {
      case 'diagnosis':
        return (
          <div className="space-y-3">
            <div dangerouslySetInnerHTML={{ __html: message.text }} />
            
            {message.category && (
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-800">التشخيص:</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                    {message.category === 'electrical' && 'كهرباء'}
                    {message.category === 'plumbing' && 'سباكة'}
                    {message.category === 'carpentry' && 'نجارة'}
                    {message.category === 'painting' && 'دهان'}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span>{message.suggestedWorkers || 0} فني متاح</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-gray-500" />
                    <span>{message.estimatedPrice?.min || 0} - {message.estimatedPrice?.max || 0} درهم</span>
                  </div>
                </div>
              </div>
            )}
            
            {message.quickReplies && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">اختر الإجابة:</p>
                <div className="flex flex-wrap gap-2">
                  {message.quickReplies.map((reply, index) => (
                    <button
                      key={index}
                      onClick={() => onQuickReply && onQuickReply(reply)}
                      className="px-3 py-2 bg-white border border-gray-300 rounded-full text-sm hover:bg-blue-50 hover:border-blue-300 transition"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'worker_suggestion':
        return (
          <div>
            <div dangerouslySetInnerHTML={{ __html: message.text }} />
            <button
              onClick={onSuggestWorker}
              className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition w-full font-medium"
            >
              عرض تفاصيل الفنيين
            </button>
          </div>
        );

      case 'image_with_text':
        return (
          <div className="space-y-3">
            {message.text && <p>{message.text}</p>}
            {message.images && message.images.length > 0 && (
              <div className="grid grid-cols-2 gap-2">
                {message.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Problem ${index + 1}`}
                    className="rounded-lg object-cover h-32 w-full"
                  />
                ))}
              </div>
            )}
          </div>
        );

      default:
        return <div dangerouslySetInnerHTML={{ __html: message.text }} />;
    }
  };

  return (
    <div className={`flex ${isAI ? 'justify-start' : 'justify-end'} mb-4`}>
      <div className={`flex max-w-[85%] ${isAI ? 'flex-row' : 'flex-row-reverse'}`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 ${isAI ? 'mr-2' : 'ml-2'}`}>
          <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
            isAI ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
          }`}>
            {isAI ? <Bot className="h-5 w-5" /> : <User className="h-5 w-5" />}
          </div>
        </div>

        {/* Message Bubble */}
        <div>
          <div className={`rounded-2xl px-4 py-3 ${
            isAI
              ? 'bg-white border border-gray-200 rounded-tl-none shadow-sm'
              : 'bg-blue-600 text-white rounded-tr-none'
          }`}>
            {renderContent()}
          </div>
          
          {/* Time and Status */}
          <div className={`flex items-center mt-1 text-xs ${
            isAI ? 'text-gray-500 justify-start' : 'text-blue-600 justify-end'
          }`}>
            <Clock className="h-3 w-3 mr-1" />
            <span>{timeString}</span>
            {isUser && (
              <span className="ml-2">
                {message.read ? (
                  <CheckCheck className="h-3 w-3" />
                ) : (
                  <Check className="h-3 w-3" />
                )}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;