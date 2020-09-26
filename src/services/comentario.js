import axios from "axios"

let baseURL;

process.env.NODE_ENV === "production"
? (baseURL = process.env.REACT_APP_REMOTEURL)
: (baseURL = process.env.REACT_APP_LOCALHOST)

baseURL = baseURL + "api/comentario"
  
const service = axios.create({ withCredentials: true, baseURL })


export const addComentarioService = async (noticiaId, comentario) => {
    return await service.post(`/${noticiaId}`, comentario).catch(err => {
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