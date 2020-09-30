import axios from "axios"

let baseURL;

process.env.NODE_ENV === "production"
? (baseURL = "/")
: (baseURL = process.env.REACT_APP_LOCALHOST)

baseURL = baseURL + "api/destacado"

const service = axios.create({ withCredentials: true, baseURL })

export const getNoticiaDestacadaService = async () => {
    return await service.get(`/`).catch(err => {
        return {message: err.response?.data?.message, status: err?.status}
    })
}

export const addNoticiaDestacadaService = async (idNoticia) => {
    return await service.post(`/`,{idNoticia}).catch(err => {
        return {message: err.response?.data?.message, status: err?.status}
    })
}

export const deleteNoticiaDestacada = async (idDestacado) => {
    return await service.delete(`/${idDestacado}`).catch(err => {
        return {message: err.response?.data?.message, status: err?.status}
    })
}