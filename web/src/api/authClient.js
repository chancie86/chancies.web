import { client } from './client';

export async function authClient(endpoint, { headers, ...rest }) {
  const token = window.localStorage.getItem("token");

  if (!token) {
    throw new Error("Not authenticated");
  }

  const headersWithToken = {
    ...headers,
    Authorization: `Bearer ${token}`
  }
  return await client(endpoint, {
    ...rest,
    headers: headersWithToken
  });
}

authClient.get = function(endpoint) {
  const config = {
    method: "GET"
  };

  return authClient(endpoint, config);
};

authClient.post = function(endpoint, body) {
  const config = {
    method: "POST",
    body: body
  };

  return authClient(endpoint, config);
};

authClient.put = function(endpoint, body) {
  const config = {
    method: "PUT",
    body: body
  };

  return authClient(endpoint, config);
};
