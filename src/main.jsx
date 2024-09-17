import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignUp from './components/Signup.jsx';
import SignIn from './components/Signin.jsx';
import HomePage from './components/Homepage.jsx'; // Import HomePage

// Create the router with routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/signin',
    element: <SignIn />,
  },
  {
    path: '/homepage',
    element: <HomePage />, // Add route for HomePage
  },
  
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Provide the router to your app */}
    <RouterProvider router={router} />
  </StrictMode>,
);
