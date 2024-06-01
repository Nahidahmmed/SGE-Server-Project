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
import NewApplication from "./Pages/NewApplication/NewApplication";
import ApplicationHistory from "./Pages/ApplicationHistory/ApplicationHistory";
import ApplicationInfo from "./Pages/ApplicationInfo/ApplicationInfo";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginPage from "./Pages/LoginPage/LoginPage";

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
            <RegistrationForm />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <LoginPage/>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <ApplicationInfo />,
      },
      {
        path: "/dashboard/newApplication",
        element: <NewApplication />,
      },
      {
        path: "/dashboard/applicationHistory",
        element: <ApplicationHistory />,
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
