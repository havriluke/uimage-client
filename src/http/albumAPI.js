import {$host, $authHost} from './index'

export const createAlbum = async (name, isPrivate) => {
    const {data} = await $authHost.post('api/album', {name, isPrivate})
    return data
}

export const deleteAlbum = async (name) => {
    const {data} = await $authHost.delete('api/album', {params: {name}})
    return data
}

export const rename = async (name, newName) => {
    const {data} = await $authHost.put('api/album', {name, newName})
    return data
}

export const addAccess = async (albumName, username) => {
    const {data} = await $authHost.put('api/album/access/add', {albumName, username})
    return data
}

export const removeAccess = async (albumName, username) => {
    const {data} = await $authHost.put('api/album/access/remove', {albumName, username})
    return data
}

export const getInfo = async (albumCode) => {
    const {data} = await $authHost.get('api/album', {params: {albumCode}})
    return data
}

export const secureSearch = async (albumName, searchLine, mode) => {
    const {data} = await $authHost.get('api/album/secure', {params: {albumName, searchLine, mode}})
    return data
}

export const toggleFavorites = async (albumCode) => {
    const {data} = await $authHost.put('api/album/favorites', {albumCode})
    return data
}