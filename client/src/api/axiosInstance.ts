import axios, { AxiosError } from 'axios'
import jwtDecode from 'jwt-decode'

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
})

axiosInstance.interceptors.request.use(async (req) => {
    return req
}, error => Promise.reject(error))
axiosInstance.interceptors.response.use(async (res) => {
    return res
}, async error => {
    return Promise.reject(error)
})
