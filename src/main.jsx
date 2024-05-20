import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
// import Layout from './Layout/Layout';
import { LoginPage } from './Pages/LoginPage/LoginPage';
import AuthProviders from './Providers/AuthProviders';
import Dashboard from './Pages/Dashboard/Dashboard';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import RegistrationForm from './Pages/RegistrationForm/RegistrationForm';
import Layout from './Layout/Layout';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <PrivateRoute><RegistrationForm/></PrivateRoute>
      },
      {
        path: "/login",
        element: <LoginPage/>
      }
    ]
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><Dashboard/></PrivateRoute>,
    // children: [
    //   {
    //     path: "/login",
    //     element: <LoginPage/>
    //   }
    // ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <AuthProviders>
      <RouterProvider router={router} />
      </AuthProviders>
  </React.StrictMode>,
)
