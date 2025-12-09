import React, { useState } from 'react';
import { MessageCircle, Bot, X } from 'lucide-react';
import ChatWidget from './ChatWidget';

const ChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [unread, setUnread] = useState(0);

  const handleProblemDiagnosis = (data) => {
    console.log('Diagnosis data:', data);
    // You can send this to backend or update state
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
      >
        <div className="relative">
          <MessageCircle className="h-6 w-6" />
          {unread > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              {unread}
            </span>
          )}
        </div>
        <span className="font-medium">اسأل BricoBot</span>
        <Bot className="h-5 w-5" />
      </button>

      {isOpen && (
        <ChatWidget
          onClose={() => setIsOpen(false)}
          onProblemDiagnosis={handleProblemDiagnosis}
        />
      )}
    </>
  );
};

export default ChatButton;