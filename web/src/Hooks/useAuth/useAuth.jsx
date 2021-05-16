import { useAuth0 } from "@auth0/auth0-react";

export default function useAuth() {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  return {
    isAuthenticated,
    loginWithRedirect,
    logout
  };
}
