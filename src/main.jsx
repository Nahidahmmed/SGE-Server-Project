import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Layout from './Layout/Layout';

import AuthProviders from "./Providers/AuthProviders";
import Dashboard from "./Pages/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import RegistrationForm from "./Pages/RegistrationForm/RegistrationForm";
import Layout from "./Layout/Layout";

import ApplicationHistory from "./Pages/ApplicationHistory/ApplicationHistory";
import ApplicationInfo from "./Pages/ApplicationInfo/ApplicationInfo";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginPage from "./Pages/LoginPage/LoginPage";
import UploadFile from "./Pages/UploadFile/UploadFile";
import NewApplicationParent from "./Pages/NewApplicationParent/NewApplicationParent";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
        children: [
          {
            path: "/",
            element: <PrivateRoute><ApplicationInfo /></PrivateRoute>,
          },
          {
            path: "/dashboard/newApplication",
            element: <PrivateRoute><NewApplicationParent/></PrivateRoute>,
          },
          {
            path: "/dashboard/applicationHistory",
            element: <PrivateRoute><ApplicationHistory /></PrivateRoute>,
          },
        ],
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegistrationForm />,
      },
      {
        path: "/upload",
        element: <UploadFile />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProviders>
        <RouterProvider router={router} />
      </AuthProviders>
    </QueryClientProvider>
  </React.StrictMode>
);
