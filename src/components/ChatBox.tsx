import { ReactNode } from 'react';

interface ChatBoxProps {
  children: ReactNode;
}

const ChatBox = ({ children }: ChatBoxProps) => {
  return (
    <div className="bg-card rounded-xl border border-border flex flex-col h-[600px]">
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold text-foreground">Consultation Chat</h3>
        <p className="text-sm text-muted-foreground">Real-time messaging with your doctor</p>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {children}
      </div>
    </div>
  );
};

export default ChatBox;
