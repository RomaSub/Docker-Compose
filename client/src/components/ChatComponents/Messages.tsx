interface Message {
  user: { name: string };
  message: string;
}

interface MessagesProps {
  messages: Message[];
}

const Messages: React.FC<MessagesProps> = ({ messages }) => {
  return (
    <div>
      {messages.map(({ user, message }, ind) => (
        <div className="text-break  mb-2 text-white" key={ind}>
          <div>
            <b>{user.name}:</b>
            <span className="message ms-2">{message}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Messages;
