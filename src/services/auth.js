import axios from "axios"

let baseURL;

process.env.NODE_ENV === "production"
  ? (baseURL = "/")
  : (baseURL = process.env.REACT_APP_LOCALHOST)
  
baseURL = baseURL + "auth"
  
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

export const getProfileExtraDataService = async () => {
  return await service.get("/profile")
}

export const updateProfileDataService = async user => {
  return await service.post("/profile", user).catch(err => {
      return {message: err.response?.data?.message, status: err?.status}
  })
}

export const updateProfileAvatarService = async imgLink => {
  return await service.post("/profileAvatar", {profilePicture:imgLink}).catch(err => {
      return {message: err.response?.data?.message, status: err?.status}
  })
}