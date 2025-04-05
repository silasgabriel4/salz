import { useState, useContext } from "react";
import { AppContext } from '../context/AppContext'
import ChatbotIcon from "./ChatbotIcon";

const Chatbot = () => {
  const {
    chatbotOpen,
    setChatbotOpen,
    chatMessages,
    setChatMessages,
    sendChatMessage,
    isBotTyping,
    userData
  } = useContext(AppContext);
  
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || !userData) return;

    // Add user message
    setChatMessages(prev => [...prev, { text: inputMessage, sender: "user" }]);
    setInputMessage("");

    // Get bot response
    const { response, needsConsultant, consultantLink } = await sendChatMessage(inputMessage);

    // Add bot response
    setChatMessages(prev => [...prev, { text: response, sender: "bot" }]);

    // Add consultant prompt if needed
    if (needsConsultant) {
      setChatMessages(prev => [
        ...prev,
        {
          text: "Would you like to speak with a professional consultant?",
          sender: "bot",
          isAction: true,
          link: consultantLink
        }
      ]);
    }
  };

  return (
    <div className="chat-i fixed bottom-5 right-10 z-50">
      {/* Chatbot Icon Button */}
      <div 
        className="cursor-pointer" 
        onClick={() => setChatbotOpen(!chatbotOpen)}
      >
        <ChatbotIcon />
      </div>

      {/* Chatbot Popup */}
      {chatbotOpen && (
        <div className="absolute right-0 bottom-full mb-4 w-72">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="chat-header bg-blue-500 text-white p-3 flex justify-between items-center">
              <div className="flex items-center">
                <ChatbotIcon />
                <h2 className="ml-2 font-medium">Chatbot</h2>
              </div>
              <div 
                className="cursor-pointer" 
                onClick={() => setChatbotOpen(false)}
              >
                <button className="text-white">▼</button>
              </div>
            </div>

            <div className="chat-body p-3 h-48 overflow-y-auto">
              {chatMessages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-2`}
                >
                  {msg.sender === 'bot' && !msg.isAction && (
                    <div className="mr-2">
                      <ChatbotIcon />
                    </div>
                  )}
                  <div 
                    className={`rounded-lg p-2 ${
                      msg.sender === 'user' 
                        ? 'bg-blue-500 text-white' 
                        : msg.isAction
                          ? 'bg-purple-100 border border-purple-300'
                          : 'bg-gray-100'
                    }`}
                  >
                    <p>{msg.text}</p>
                    {msg.isAction && (
                      <a 
                        href={msg.link} 
                        className="mt-1 inline-block bg-purple-500 text-white px-2 py-1 rounded text-sm hover:bg-purple-600"
                      >
                        Book Appointment
                      </a>
                    )}
                  </div>
                </div>
              ))}
              {isBotTyping && (
                <div className="flex justify-start mb-2">
                  <div className="mr-2">
                    <ChatbotIcon />
                  </div>
                  <div className="bg-gray-100 rounded-lg p-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="chat-footer p-2 border-t">
              <form className="flex" onSubmit={handleSendMessage}>
                <input
                  type="text"
                  placeholder={userData ? "Type your message..." : "Please login to chat"}
                  className="flex-1 border rounded-l-lg p-2 focus:outline-none"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  disabled={!userData}
                />
                <button
                  type="submit"
                  className={`bg-blue-500 text-white p-2 rounded-r-lg ${
                    !userData ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={!userData || !inputMessage.trim()}
                >
                  ↑
                </button>
              </form>
              {!userData && (
                <p className="text-xs text-red-500 mt-1 text-center">
                  Please login to use the chatbot
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;