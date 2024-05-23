import { Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import ChatPage from './ChatPage';

const ChatRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/chat" element={<ChatPage />} />
    </Routes>
  );
};

export default ChatRoutes;
