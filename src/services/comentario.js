import axios from "axios"

let baseURL;

process.env.NODE_ENV === "production"
? (baseURL = "/")
: (baseURL = process.env.REACT_APP_LOCALHOST)

baseURL = baseURL + "api/comentario"
  
const service = axios.create({ withCredentials: true, baseURL })

export const getComentariosService = async () => {
    return await service.get(`/`).catch(err => {
        return {message: err.response?.data?.message, status: err?.status}
    })
}

export const addComentarioService = async (noticiaId, comentario) => {
    return await service.post(`/${noticiaId}`, comentario).catch(err => {
        return {message: err.response?.data?.message, status: err?.status}
    })
}

export const editComentarioService = async (comentarioId, comentario) => {
    return await service.put(`/${comentarioId}`, comentario).catch(err => {
        return {message: err.response?.data?.message, status: err?.status}
    })
}

export const deleteComentarioService = async comentarioId => {
  return await service.delete(`/${comentarioId}`).catch(err => {
      return {message: err.response?.data?.message, status: err?.status}
  })
}