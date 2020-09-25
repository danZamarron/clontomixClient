import axios from "axios"

let baseURL;

process.env.NODE_ENV === "production"
  ? (baseURL = "https://murmuring-reaches-95521.herokuapp.com")
  : (baseURL = "http://localhost:4000/api/noticia")
  
const service = axios.create({ withCredentials: true, baseURL })

export const getAllNoticiasNoPageService = async () => {
  return await service.get("/").catch(err => {
      return {message: err.response?.data?.message, status: err?.status}
  })
}

export const getAllNoticiasByUserService = async () => {
  return await service.get("/user").catch(err => {
      return {message: err.response?.data?.message, status: err?.status}
  })
}

export const getAllNoticiasByUserParamService = async (userId) => {
  return await service.get(`/user/${userId}`).catch(err => {
      return {message: err.response?.data?.message, status: err?.status}
  })
}

export const addNoticiaService = async noticia => {
    return await service.post("/", noticia).catch(err => {
        return {message: err.response?.data?.message, status: err?.status}
    })
}

export const getNoticiaService = async noticiaId => {
    return await service.get(`/edit/${noticiaId}`).catch(err => {
        return {message: err.response?.data?.message, status: err?.status}
    })
}

export const editNoticiaService = async noticia => {
    return await service.put(`/edit/${noticia.noticiaId}`, noticia).catch(err => {
        return {message: err.response?.data?.message, status: err?.status}
    })
}

export const deleteNoticiaService = async noticiaId => {
  return await service.delete(`/delete/${noticiaId}`).catch(err => {
      return {message: err.response?.data?.message, status: err?.status}
  })
}