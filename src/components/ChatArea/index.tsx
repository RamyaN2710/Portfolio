import React from 'react';

interface Message {
  id: number;
  content: string;
  timestamp: string;
}

interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  location: string;
  profileImage: string;
}

interface ChatAreaProps {
  messages: Message[];
  personalInfo: PersonalInfo;
}

const ChatArea: React.FC<ChatAreaProps> = ({ messages, personalInfo }) => {
  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="h-16 bg-white border-b border-teams-border flex items-center px-6">
        <div className="teams-avatar">
          {personalInfo.name.charAt(0)}
        </div>
        <div className="ml-4">
          <h2 className="text-teams-black font-semibold text-lg">{personalInfo.name}</h2>
          <p className="text-teams-secondary text-sm">{personalInfo.title}</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 bg-white">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-teams-secondary">
            No messages to display
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((message) => (
              <div key={message.id} className="teams-message">
                <div className="flex items-start">
                  <div className="teams-avatar">
                    {personalInfo.name.charAt(0)}
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-center">
                      <span className="font-semibold text-teams-black">
                        {personalInfo.name}
                      </span>
                      <span className="text-teams-secondary text-xs ml-2">
                        {message.timestamp}
                      </span>
                    </div>
                    <div className="mt-1 text-teams-black whitespace-pre-wrap leading-relaxed">
                      {message.content}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="h-20 bg-white border-t border-teams-border px-6 py-4">
        <div className="flex items-center">
          <input 
            type="text"
            disabled
            placeholder="Type a message"
            className="teams-input"
          />
          <button 
            disabled
            className="ml-4 px-4 py-2 bg-teams-primary text-white rounded-md opacity-50 cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;