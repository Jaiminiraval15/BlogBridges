import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthContextProvider } from './context/AuthContext';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Login } from './components/Forms/LoginForm';
import { Signup } from './components/Forms/SignupForm';
import Home from './components/Home';
import Layout from './components/Layout';
import Blog from './components/Blog';
import MDE from './components/MDE';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Home/> },
      {path:'/blog',element:<Blog/>},
      {path:'/mde',element:<MDE/>}
    ],
  },{
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  

},]);
const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <RouterProvider router={router}></RouterProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
