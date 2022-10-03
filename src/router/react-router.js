import * as React from "react";
import { useRoutes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute.js";
import Layout from "./Layout.jsx";
import HomeScreen from "pages/home-screen/index.jsx";
import CodeScreen from "pages/code-screen/index.jsx";
import Dashboard from "pages/dashboard/index.jsx";

export default function AppRouting() {
  const routes = useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomeScreen />,
        },
        {
          path: "/code",
          element: <CodeScreen />,
        },
        {
          path: "/home",
          element: <PrivateRoute Component={Dashboard} />,
        },
      ],
    },
  ]);
  return routes;
}