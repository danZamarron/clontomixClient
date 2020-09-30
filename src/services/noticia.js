import axios from "axios"

let baseURL;

process.env.NODE_ENV === "production"
  ? (baseURL = "/")
  : (baseURL = process.env.REACT_APP_LOCALHOST)

baseURL = baseURL + "api/noticia"
  
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
    return await service.get(`/detail/${noticiaId}`).catch(err => {
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

export const getAllNoticiasNotApprovedService = async () => {
  return await service.get(`/notApproved`).catch(err => {
      return {message: err.response?.data?.message, status: err?.status}
  })
}

export const approveNoticiaService = async noticiaId => {
  return await service.put(`/approved/${noticiaId}`).catch(err => {
      return {message: err.response?.data?.message, status: err?.status}
  })
}

export const getAllNoticiasDestacadasService = async () => {
  return await service.get(`/noticiasDestacadas`).catch(err => {
      return {message: err.response?.data?.message, status: err?.status}
  })
}