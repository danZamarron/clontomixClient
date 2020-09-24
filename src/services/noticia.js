import axios from "axios"

let baseURL;

process.env.NODE_ENV === "production"
  ? (baseURL = "https://murmuring-reaches-95521.herokuapp.com")
  : (baseURL = "http://localhost:4000/api/noticia")
  
const service = axios.create({ withCredentials: true, baseURL })

export const addNoticiaService = async noticia => {
    return await service.post("/", noticia).catch(err => {
        debugger;
        return {message: err.response?.data?.message, status: err?.status}
    })
  }