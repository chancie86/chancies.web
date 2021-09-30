import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export default function useAuth() {
  const { isAuthenticated, loginWithRedirect, logout, getAccessTokenSilently } = useAuth0();
  const [hasReceivedToken, setHasReceivedToken] = useState(false);

  useEffect(() => {
    if (hasReceivedToken) {
      // We're already authenticated. Nothing to do.
      return;
    }

    if (isAuthenticated) {
      const getAccessToken = async () => {
        const token = await getAccessTokenSilently();
        window.localStorage.setItem('token', token);
        setHasReceivedToken(true);
      };
      getAccessToken();
    }
  }, [isAuthenticated, getAccessTokenSilently, hasReceivedToken]);

  return {
    isAuthenticated: hasReceivedToken,
    loginWithRedirect,
    logout: () => {
      logout({ returnTo: window.location.origin });
      window.localStorage.removeItem('token');
      setHasReceivedToken(false);
    },
  };
}
