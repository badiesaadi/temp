interface MessageBubbleProps {
  sender: string;
  text: string;
  timestamp: string;
}

const MessageBubble = ({ sender, text, timestamp }: MessageBubbleProps) => {
  const isDoctor = sender === 'Doctor';
  
  return (
    <div className={`flex ${isDoctor ? 'justify-start' : 'justify-end'}`}>
      <div className={`max-w-[70%] ${isDoctor ? 'order-1' : 'order-2'}`}>
        <div className={`rounded-2xl p-4 ${
          isDoctor 
            ? 'bg-accent text-accent-foreground' 
            : 'bg-primary text-primary-foreground'
        }`}>
          <p className="text-sm font-medium mb-1">{sender}</p>
          <p>{text}</p>
        </div>
        <span className="text-xs text-muted-foreground mt-1 block">{timestamp}</span>
      </div>
    </div>
  );
};

export default MessageBubble;
