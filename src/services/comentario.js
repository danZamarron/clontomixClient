import axios from "axios"

let baseURL;

process.env.NODE_ENV === "production"
  ? (baseURL = "https://murmuring-reaches-95521.herokuapp.com")
  : (baseURL = "http://localhost:4000/auth")
  
const service = axios.create({ withCredentials: true, baseURL })


export const addComentarioService = async noticia => {
    return await service.post("/", noticia).catch(err => {
        return {message: err.response?.data?.message, status: err?.status}
    })
}

// export const editComentarioService = async comentario => {
//     return await service.put(`/edit/${comentario.noticiaId}`, noticia).catch(err => {
//         return {message: err.response?.data?.message, status: err?.status}
//     })
// }

export const deleteNoticiaService = async comentarioId => {
  return await service.delete(`/delete/${comentarioId}`).catch(err => {
      return {message: err.response?.data?.message, status: err?.status}
  })
}