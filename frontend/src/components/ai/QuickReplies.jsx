import React from 'react';
import { Zap, MessageSquare, HelpCircle } from 'lucide-react';

const QuickReplies = ({ replies, onSelect, title = "الردود السريعة" }) => {
  const commonReplies = [
    { text: "كهرباء لا تعمل", icon: "⚡", color: "yellow" },
    { text: "تسرب ماء", icon: "💧", color: "blue" },
    { text: "دهان جدران", icon: "🎨", color: "purple" },
    { text: "تركيب أثاث", icon: "🔨", color: "orange" },
    { text: "إصلاح تكييف", icon: "❄️", color: "cyan" },
    { text: "سباكة عامة", icon: "🛠️", color: "gray" }
  ];

  const displayReplies = replies || commonReplies.map(r => r.text);

  const getIconAndColor = (text) => {
    const reply = commonReplies.find(r => r.text === text);
    return reply || { icon: "💬", color: "gray" };
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Zap className="h-4 w-4 text-blue-600" />
          <h3 className="font-medium text-gray-800">{title}</h3>
        </div>
        <HelpCircle className="h-4 w-4 text-gray-400" />
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        {displayReplies.map((reply, index) => {
          const { icon, color } = getIconAndColor(reply);
          const colorClasses = {
            blue: 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100',
            yellow: 'bg-yellow-50 border-yellow-200 text-yellow-700 hover:bg-yellow-100',
            purple: 'bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100',
            orange: 'bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100',
            cyan: 'bg-cyan-50 border-cyan-200 text-cyan-700 hover:bg-cyan-100',
            gray: 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
          };

          return (
            <button
              key={index}
              onClick={() => onSelect && onSelect(reply)}
              className={`flex items-center space-x-2 p-3 rounded-lg border transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${colorClasses[color] || colorClasses.gray}`}
            >
              <span className="text-lg">{icon}</span>
              <span className="text-right flex-1 font-medium text-sm">{reply}</span>
              <MessageSquare className="h-3 w-3 opacity-60" />
            </button>
          );
        })}
      </div>

      {/* Emergency Button */}
      <button className="mt-3 w-full p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg hover:bg-red-100 transition flex items-center justify-center space-x-2 font-medium">
        <span className="h-2 w-2 bg-red-600 rounded-full animate-pulse"></span>
        <span>🚨 حالة طارئة - اتصل الآن</span>
        <span className="h-2 w-2 bg-red-600 rounded-full animate-pulse"></span>
      </button>

      {/* Translation Note */}
      <div className="mt-3 pt-3 border-t border-gray-100">
        <p className="text-xs text-gray-500 text-center">
          💡 يمكنك التحدث بالعربية أو الفرنسية، BricoBot يفهم جميع اللهجات المغربية
        </p>
      </div>
    </div>
  );
};

export default QuickReplies;