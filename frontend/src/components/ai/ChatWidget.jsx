import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Mic, Bot, X, Sparkles, Loader2, Image as ImageIcon, Volume2, Globe } from 'lucide-react';
import { useLanguage } from "../../context/LanguageContext";
import useTranslation from "../../hook/useTranslation";
import MessageBubble from './MessageBubble';
import QuickReplies from './QuickReplies';

const ChatWidget = ({ onClose, onProblemDiagnosis }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const { isRTL, language } = useLanguage();
  const { t } = useTranslation();

  useEffect(() => {
    // Set initial welcome message based on language
    const welcomeMessage = {
      id: 1,
      text: t('ai.welcome'),
      sender: 'ai',
      timestamp: new Date(),
      type: 'text',
      quickReplies: t('ai.quickReplies')
    };
    setMessages([welcomeMessage]);
  }, [language]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputText.trim() && selectedImages.length === 0) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
      type: selectedImages.length > 0 ? 'image_with_text' : 'text',
      images: selectedImages.length > 0 ? selectedImages : []
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setSelectedImages([]);
    setShowQuickReplies(false);

    // Simulate AI thinking
    setIsTyping(true);

    // Simulate AI response after delay
    setTimeout(() => {
      const aiResponses = language === 'ar' ? [
        {
          text: "ماشي حلا! على أساس الوصف ديالك، كنبين بلي كتحتاج:<br><strong>فني كهرباء متخصص</strong><br>👷 12 فني متاح قريب منك<br>💰 السعر المتوقع: 200-500 درهم<br>⏱️ الوقت المتوقع: 1-3 ساعات<br><br>بغيتي نوصلك بأحسن الفنيين فمدينتك؟",
          type: 'diagnosis',
          category: 'electrical',
          estimatedPrice: { min: 200, max: 500 },
          suggestedWorkers: 12,
          quickReplies: ["ياه، ويني لي فهاد الفنيين", "لا، عندي أسئلة خرة", "شحال هو السعر بالضبط؟"]
        }
      ] : [
        {
          text: "Merci pour la description ! D'après ce que vous décrivez, je pense que vous avez besoin d'un :<br><strong>Électricien spécialisé</strong><br>👷 12 techniciens disponibles près de chez vous<br>💰 Coût estimé : 200-500 DH<br>⏱️ Temps estimé : 1-3 heures<br><br>Souhaitez-vous que je vous connecte aux meilleurs techniciens de votre région ?",
          type: 'diagnosis',
          category: 'electrical',
          estimatedPrice: { min: 200, max: 500 },
          suggestedWorkers: 12,
          quickReplies: ["Oui, montrez-moi les techniciens", "Non, j'ai d'autres questions", "Quel est le coût exact ?"]
        }
      ];

      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      
      const aiMessage = {
        id: messages.length + 2,
        ...randomResponse,
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
      
      if (randomResponse.type === 'diagnosis' && onProblemDiagnosis) {
        onProblemDiagnosis(randomResponse);
      }
    }, 1500);
  };

  const handleQuickReply = (reply) => {
    const userMessage = {
      id: messages.length + 1,
      text: reply,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    handleSendMessage();
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setSelectedImages(prev => [...prev, ...imageUrls]);
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert(language === 'ar' ? 'المتصفح ديالك ماكايدعمش التعرف الصوتي' : 'Votre navigateur ne supporte pas la reconnaissance vocale');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = language === 'ar' ? 'ar-MA' : 'fr-FR';

    recognition.onstart = () => {
      setIsRecording(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
      setIsRecording(false);
    };

    recognition.onerror = () => {
      setIsRecording(false);
    };

    recognition.start();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const removeImage = (index) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 z-50" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      
      <div className={`absolute ${isRTL ? 'left-0' : 'right-0'} top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4">
          <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
              <div className="bg-white p-2 rounded-full">
                <Bot className="h-6 w-6 text-blue-600" />
              </div>
              <div className={isRTL ? 'text-right' : ''}>
                <h2 className="text-lg font-bold">{t('ai.chatTitle')}</h2>
                <p className="text-sm opacity-90">{t('ai.chatSubtitle')}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              onQuickReply={handleQuickReply}
              isRTL={isRTL}
            />
          ))}
          
          {isTyping && (
            <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'} text-gray-500`}>
              <div className="bg-white p-3 rounded-2xl shadow-sm">
                <div className="flex space-x-1">
                  <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies */}
        {showQuickReplies && messages[messages.length - 1]?.quickReplies && (
          <QuickReplies
            replies={messages[messages.length - 1].quickReplies}
            onSelect={handleQuickReply}
            isRTL={isRTL}
          />
        )}

        {/* Image Preview */}
        {selectedImages.length > 0 && (
          <div className="p-3 border-t bg-white">
            <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'} mb-2`}>
              <ImageIcon className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                {selectedImages.length} {language === 'ar' ? 'صورة مرفوعة' : 'images téléchargées'}
              </span>
            </div>
            <div className={`flex ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'} overflow-x-auto`}>
              {selectedImages.map((img, index) => (
                <div key={index} className="relative">
                  <img
                    src={img}
                    alt={`Upload ${index + 1}`}
                    className="h-16 w-16 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="border-t border-gray-200 p-4 bg-white">
          <div className={`flex items-end ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
            {/* File Upload */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-3 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition"
            >
              <Paperclip className="h-5 w-5" />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              multiple
              accept="image/*"
              className="hidden"
            />

            {/* Voice Input */}
            <button
              onClick={handleVoiceInput}
              className={`p-3 rounded-full transition ${
                isRecording
                  ? 'bg-red-100 text-red-600 animate-pulse'
                  : 'text-gray-500 hover:text-green-600 hover:bg-green-50'
              }`}
            >
              {isRecording ? (
                <div className="h-5 w-5 rounded-full bg-red-600"></div>
              ) : (
                <Mic className="h-5 w-5" />
              )}
            </button>

            {/* Text Input */}
            <div className="flex-1 relative">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t('ai.typeHere')}
                className={`w-full border border-gray-300 rounded-2xl py-3 px-4 ${isRTL ? 'pr-12' : 'pl-12'} focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none`}
                rows="1"
                dir={isRTL ? 'rtl' : 'ltr'}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim() && selectedImages.length === 0}
                className={`absolute ${isRTL ? 'left-3' : 'right-3'} bottom-3 p-2 rounded-full ${
                  inputText.trim() || selectedImages.length > 0
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Help Text */}
          <div className={`mt-3 flex items-center justify-between text-xs text-gray-500 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
              <Sparkles className="h-3 w-3" />
              <span>{language === 'ar' ? 'تحدث بالعربية أو الفرنسية، بريكوبوت كيفهم' : 'Parlez arabe ou français, BricoBot comprend'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWidget;