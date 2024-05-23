import { useLocation, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { useRef, useState, useEffect } from 'react';
import OnlineList from './ChatComponents/OnlineList.tsx';
import Messages from './ChatComponents/Messages.tsx';
import InputChat from './ChatComponents/InputChat.tsx';
import ChatInfo from './ChatComponents/ChatInfo.tsx';

const socket = io('http://localhost:3000');

interface Params {
  name: string;
  room: string;
}

interface Message {
  user: { name: string };
  message: string;
}

const ChatPage = () => {
  const { search } = useLocation();
  const [params, setParams] = useState<Params>({ name: '', room: '' });
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState<string>('');
  const [users, setUsers] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const searchParamsObj = Object.fromEntries(new URLSearchParams(search));
    const searchParams: Params = {
      name: searchParamsObj.name || '',
      room: searchParamsObj.room || '',
    };
    setParams(searchParams);
    socket.emit('join', searchParams);
  }, [search]);

  useEffect(() => {
    socket.on('message', ({ data }) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    socket.on('room', ({ data: { users } }) => {
      setUsers(users.map((user: { name: string }) => user.name));
    });
    return () => {
      socket.off('message');
      socket.off('room');
    };
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text) return;

    socket.emit('sendMessage', { message: text, params });
    setText('');
  };

  const handleLogout = () => {
    socket.emit('leftRoom', { params });
    navigate('/');
  };

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div
        className="row h-100 flex-md-row"
        style={{ backgroundColor: '#1E1E1E' }}
      >
        <div
          className="col-4 col-md-2 border-end border-dark pt-4 px-0"
          style={{ backgroundColor: '#1E1E1E' }}
        >
          <div className="d-flex justify-content-between mb-4 ps-5 pe-2 text-white">
            <b>Онлайн</b>
          </div>
          <ul className="nav flex-column nav-pills nav-fill px-2">
            <OnlineList users={users} />
          </ul>
        </div>
        <div className="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            <ChatInfo
              room={params.room}
              messageCount={messages.length}
              handleLogout={handleLogout}
            />
            <div
              id="messages-box"
              className="chat-messages overflow-auto px-5"
              style={{ height: '590px', backgroundColor: '#1E1E1E' }}
            >
              <Messages messages={messages} />
              <div ref={messagesEndRef} />
            </div>
            <div
              className="mt-auto px-5 py-3 "
              style={{ backgroundColor: '#1E1E1E' }}
            >
              <InputChat
                value={text}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
