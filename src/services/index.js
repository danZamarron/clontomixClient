import axios from "axios"

let baseURL;

process.env.NODE_ENV === "production"
  ? (baseURL = "https://murmuring-reaches-95521.herokuapp.com")
  : (baseURL = "http://localhost:4000")

const service = axios.create({ withCredentials: true, baseURL })

export const getProfile = async () => {
  return await service.get("/profile")
}