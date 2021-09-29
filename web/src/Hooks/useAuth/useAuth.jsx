import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export default function useAuth() {
  const { isAuthenticated, loginWithRedirect, logout, getAccessTokenSilently } = useAuth0();
  const [hasReceivedToken, setHasReceivedToken] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      const getAccessToken = async () => {
        const token = await getAccessTokenSilently();
        window.localStorage.setItem('token', token);
        setHasReceivedToken(true);
      };
      getAccessToken();
    } else {
      window.localStorage.removeItem('token');
      setHasReceivedToken(false);
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  return {
    isAuthenticated: isAuthenticated && hasReceivedToken,
    loginWithRedirect,
    logout: () => logout({ returnTo: window.location.origin }),
  };
}
