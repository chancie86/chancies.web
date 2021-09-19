import appConfig from "../config.json";

export async function client(endpoint, { method, body, ...customConfig } = {}) {
  const baseUrl = appConfig.apiUrl;

  const headers = { "Content-Type": "application/json" };
  const config = {
    method: method,
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers
    }
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  let data;
  try {
    const response = await window.fetch(`${baseUrl}/${endpoint}`, config);
    if (response.ok) {
      switch(response.status) {
        case 200:
        case 500:
          data = await response.json();
          break;
        default:
          break;
      }
      return Promise.resolve(data);
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data);
  }
}

client.get = function(endpoint) {
  const config = {
    method: "GET"
  };

  return client(endpoint, config);
};

client.post = function(endpoint, body) {
  const config = {
    method: "POST",
    body: body
  };

  return client(endpoint, config);
};

client.put = function(endpoint, body) {
  const config = {
    method: "PUT",
    body: body
  };

  return client(endpoint, config);
};
