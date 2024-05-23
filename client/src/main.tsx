import React from 'react';
import ReactDOM from 'react-dom/client';
import ChatRoutes from './components/ChatRoutes';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="container">
        <ChatRoutes />
      </div>
    </BrowserRouter>
  </React.StrictMode>,
);
