import axios from "../config/axios";

export function getToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const payload = JSON.parse(atob(token.split(".")[1]));
  if (payload.exp < Date.now() / 1000) {
    localStorage.removeItem("token");
    return null;
  }
  return token;
}

export function getUser() {
  const token = getToken();
  return token ? JSON.parse(atob(token.split(".")[1])).user : null;
}

export async function signUp(userData) {
  const res = await axios.post("/users/add", userData);
  if (res.data.errors) {
    return res.data;
  } else {
    localStorage.setItem("token", res.data);
    return res.data;
  }
}

export async function login(userData) {
  const res = await axios.post("/users/login", userData);
  localStorage.setItem("token", res.data);
  return res.data;
}

export function signOut() {
  localStorage.removeItem("token");
}
