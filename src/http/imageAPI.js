import {$host, $authHost} from './index'

export const add = async (imageName, base64string, albumName) => {
    const {data} = await $authHost.post('api/image', {imageName, base64string, albumName})
    return data
}

export const remove = async (imageName, albumName) => {
    const {data} = await $authHost.delete('api/image', {params: {imageName, albumName}})
    return data
}

export const rename = async (albumName, imageName, newName) => {
    const {data} = await $authHost.put('api/image', {albumName, imageName, newName})
    return data
}