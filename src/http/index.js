import axios from 'axios'
import { API_URL } from '../utils/consts'

const $host = axios.create({
    baseURL: API_URL
})

const $authHost = axios.create({
    baseURL: API_URL
})

const authInterceptor = config => {
    config.headers['x-api-key'] = `${localStorage.getItem('token')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export { $host, $authHost }
