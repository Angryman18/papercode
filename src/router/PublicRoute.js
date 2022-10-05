import { useAuthenticationStatus } from "@nhost/react";

const PublicRoute = ({ Component, ...rest }) => {
  const { isAuthenticated, isLoading } = useAuthenticationStatus();

  if (isLoading) return null;
  if (!isLoading) return <Component isAuthenticated={isAuthenticated} {...rest} />;
};

export default PublicRoute;
