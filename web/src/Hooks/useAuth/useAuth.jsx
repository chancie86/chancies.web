import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

export default function useAuth() {
  const {
    isAuthenticated,
    loginWithRedirect,
    logout,
    getAccessTokenSilently
  } = useAuth0();
  
  useEffect(() => {
    if (isAuthenticated) {
      const getAccessToken = async () => {
        const token = await getAccessTokenSilently();
        window.localStorage.setItem("token", token);
      }
      getAccessToken();
    } else {
      window.localStorage.removeItem("token");
    }
  }, [isAuthenticated, getAccessTokenSilently])

  return {
    isAuthenticated,
    loginWithRedirect,
    logout
  };
}
