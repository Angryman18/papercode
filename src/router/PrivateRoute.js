import { Navigate } from "react-router-dom";
import { useAuthenticationStatus } from "@nhost/react";

const PrivateRoute = ({ Component, ...rest }) => {
  const { isAuthenticated, isLoading } = useAuthenticationStatus();

  if (isLoading) return null;
  if (!isAuthenticated) return <Navigate to='/' replace={true} />;
  if (isAuthenticated && !isLoading) return <Component isAuthenticated={isAuthenticated} {...rest} />;
};

export default PrivateRoute;
