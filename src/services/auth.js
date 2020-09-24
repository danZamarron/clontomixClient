import axios from "axios"

let baseURL;

process.env.NODE_ENV === "production"
  ? (baseURL = "https://murmuring-reaches-95521.herokuapp.com")
  : (baseURL = "http://localhost:4000/auth")
  
const service = axios.create({ withCredentials: true, baseURL })

export const signupService = async user => {
  return await service.post("/signup", user).catch(err => {
      return {message: err.response?.data?.message, status: err?.status}
  })
}
  
export const loginService = async user => {
  return await service.post("/login", user).catch(err => {
    return {message: err.response?.data?.message, status: err?.status}
  })
}

export const getCurrentUserService = async () => {
  return await service.get("/currentUser")
}

export const logoutService = async () => {
  return await service.get("/logout")
}