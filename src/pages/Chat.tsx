import { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';
import Navbar from '@/components/Navbar';
import ChatBox from '@/components/ChatBox';
import MessageBubble from '@/components/MessageBubble';
import { useAppContext } from '@/context/AppContext';
import { fetchMessages } from '@/utils/fakeAPI';

const Chat = () => {
  const { messages, setMessages } = useAppContext();
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadData = async () => {
      const messagesData = await fetchMessages();
      setMessages(messagesData as any);
      setLoading(false);
    };
    loadData();

    // Simulate real-time updates
    const interval = setInterval(() => {
      const doctorReplies = [
        'Please continue your medication as prescribed.',
        'Your test results look good!',
        'Let me know if you experience any side effects.',
        'Schedule a follow-up in two weeks.',
      ];
      
      if (Math.random() > 0.7) {
        const randomReply = doctorReplies[Math.floor(Math.random() * doctorReplies.length)];
        setMessages(prev => [
          ...prev,
          {
            id: Date.now().toString(),
            sender: 'Doctor',
            text: randomReply,
            timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (inputMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: Date.now().toString(),
          sender: 'Patient',
          text: inputMessage,
          timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setInputMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (loading) {
    return (
      <div className="flex-1">
        <Navbar title="Chat" />
        <div className="p-6">
          <div className="h-96 bg-muted rounded-xl animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <Navbar title="Chat" />
      
      <div className="p-6">
        <ChatBox>
          {messages.map(message => (
            <MessageBubble key={message.id} {...message} />
          ))}
          <div ref={messagesEndRef} />
        </ChatBox>

        <div className="mt-4 flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 px-4 py-3 bg-card border border-input rounded-lg focus:ring-2 focus:ring-ring focus:outline-none"
          />
          <button
            onClick={handleSend}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <Send className="w-5 h-5" />
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
