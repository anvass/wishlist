import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout';
import MainPage from './components/pages/MainPage';
import RegisterPage from './components/pages/RegisterPage';
import LoginPage from './components/pages/LoginPage';
import WishesPage from './components/pages/WishesPage';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <MainPage />,
        },
        {
          path: '/register',
          element: <RegisterPage />,
        },
        {
          path: '/login',
          element: <LoginPage />,
        },
        {
          path: '/wishes',
          element: <WishesPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
