import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import '/public/assets/css/fonts.css';
import '/public/assets/css/index.css';
import App from './App';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserRequired from './UserRequired';
import MainPage from './components/pages/MainPage';
import RegisterPage from './components/pages/RegisterPage';
import LoginPage from './components/pages/LoginPage';
import WishesPage from './components/pages/WishesPage';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<MainPage />} />

        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route element={<UserRequired />}>
          <Route path="/wishes" element={<WishesPage />} />
          {/* <Route path="/profile" element={<UserPage />} /> */}
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);
