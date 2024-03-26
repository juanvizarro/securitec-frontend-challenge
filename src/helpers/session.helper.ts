import axios from 'axios'

const LS_TOKEN_NAME = 'my_token'

export const setToken = (token: string) => {
    localStorage.setItem(LS_TOKEN_NAME,token)
}
export const getToken = () => {
    return localStorage.getItem(LS_TOKEN_NAME)
}
export const generateToken = async () => {
    const userData = {
        username: 'elio.rodriguez@securitec.pe',
        password: 'Hola123#'
    }
    const instace = axios.create({
        baseURL: import.meta.env.VITE_API_URL
    })
    const { data } = await instace.post<{access: string, refresh: string}>('token/', userData)
    setToken(data.access)
    return data.access
}