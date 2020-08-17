const localStorageKey = "__auth_provider_token__";

async function getToken() {
  return window.localStorage.getItem(localStorageKey);
}

function handleUserResponse({ user }) {
  window.localStorage.setItem(localStorageKey, user.token);
  return user;
}

function login({ username, password }) {
  return client("login", { username, password }).then(handleUserResponse);
}

async function logout() {
  window.localStorage.removeItem(localStorageKey);
}

// Hard Coded fake authentication
const fakeAuthResponse = {
  user: {
    token: "abc",
  },
};

async function client(endpoint, data) {
  return fakeAuthResponse;
}

export { getToken, login, logout, localStorageKey };
