import axios from "axios"

let baseURL;

process.env.NODE_ENV === "production"
  ? (baseURL = "/")
  : (baseURL = process.env.REACT_APP_LOCALHOST)


baseURL = baseURL + "api"

const service = axios.create({ withCredentials: true, baseURL })

export const getProfile = async () => {
  return await service.get("/profile")
}