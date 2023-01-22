import {$host, $authHost} from './index'

export const registration = async (username, password, email, code) => {
    const {data} = await $host.post('api/user/registration', {username, password, email, code})
    localStorage.setItem('token', data.token)
    return data.login
}

export const login = async (username, password, email, code) => {
    const {data} = await $host.post('api/user/login', {username, password, email, code})
    localStorage.setItem('token', data.token)
    return data.login
}

export const logout = async () => {
    const {data} = await $authHost.put('api/user/logout', {})
    localStorage.removeItem('token')
    return data
}

export const sendEmail = async (email) => {
    const {data} = await $host.get('/api/user/email', {params: {email}})
    return data
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return {user: data.user, expiration: data.expiration}
}

export const edit = async (password, email, code, newUsername, newPassword, newEmail, newCode) => {
    const {data} = await $authHost.put('api/user', {password, email, code, newUsername, newPassword, newEmail, newCode})
    return data
}

export const editApiKey = async () => {
    const {data} = await $authHost.put('api/user/api-key')
    localStorage.setItem('token', data.apiKey)
    return data.apiKey
}

export const editStatus = async (username, status) => {
    const {data} = await $authHost.put('api/user/status', {username, status})
    return data
}

export const getSelfInfo = async () => {
    const {data} = await $authHost.get('api/user/self-info')
    return data
}

export const getInfo = async (username) => {
    const {data} = await $authHost.get('api/user/info', {params: {username}})
    return data
}

export const clearLogin = async (login) => {
    const {data} = await $host.get('api/user/hash/clear', {params: {login}})
    return data
}

export const search = async (searchLine) => {
    const {data} = await $authHost.get('api/user/search', {params: {searchLine}})
    return data
}