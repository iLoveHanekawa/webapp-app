import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
})

axiosInstance.interceptors.request.use(async (req) => {
}, error => Promise.reject(error))
axiosInstance.interceptors.response.use(() => {

}, error => Promise.reject(error))
