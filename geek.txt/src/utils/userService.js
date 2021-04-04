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
  return token ? JSON.parse(atob(token.split(".")[1])) : null;
}

export function signUp(userData) {
  console.log("inside sign up beginning");
  axios.post("/users/add", userData).then((res) => {
    console.log(res, "inside userservice");
    localStorage.setItem("token", res.data);
    return res.data;
  });
}

export function login(userData) {
  axios.post("/users/login", userData).then((res) => {
    localStorage.setItem("token", res.data);
    return res.data;
  });
}
