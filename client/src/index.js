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

import MDE from './components/MDE';
import Blog from './components/Blogs/Blog';
import BlogDetail from './components/Blogs/BlogDetail';
import AllBlogs from './components/Blogs/AllBlogs';
import UserProfile from './components/UserProfile';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Home/> },
      {path:'/blog',element:<Blog/>},
      { path: '/blog/:blogid', element: <BlogDetail/> }, 
      {path:'/mde',element:<MDE/>},
      {path:'/profile',element:<UserProfile/>},
      {path:'/allblogs',element:<AllBlogs/>}
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
