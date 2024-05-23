import { Button } from 'react-bootstrap';

interface ChatInfoProps {
  room: string;
  messageCount: number;
  handleLogout: () => void;
}

const ChatInfo: React.FC<ChatInfoProps> = ({
  room,
  messageCount,
  handleLogout,
}) => {
  return (
    <div
      className="mb-2 p-3 shadow-sm small d-flex justify-content-between text-white"
      style={{ backgroundColor: '#1E1E1E' }}
    >
      <div>
        <p className="m-0">
          <b>Комната номер {room}</b>
        </p>
        <span className="text-white">число сообщений: {messageCount}</span>
      </div>
      <div className="ml-auto">
        <Button onClick={handleLogout} variant="danger">
          Выйти
        </Button>
      </div>
    </div>
  );
};

export default ChatInfo;
