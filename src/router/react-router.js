import * as React from "react";
import { useRoutes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute.js";
import PublicRoute from "./PublicRoute.js";
import Layout from "./Layout.jsx";
import HomeScreen from "pages/home-screen/index.jsx";
import CodeScreen from "pages/code-screen/index.jsx";
import Dashboard from "pages/dashboard/index.jsx";
import { useAccessToken } from "@nhost/react";

export default function AppRouting() {
  const accessToken = useAccessToken()
  const routes = useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <PublicRoute Component={HomeScreen} />
        },
        {
          path: "/code",
          element: <PublicRoute accessToken={accessToken} Component={CodeScreen} />,
        },
        {
          path: "/home",
          element: <PrivateRoute accessToken={accessToken} Component={Dashboard} />,
        },
      ],
    },
  ]);
  return routes;
}
