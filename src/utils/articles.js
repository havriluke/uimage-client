import privacyImage from '../assets/main-blocks/main-lock-blue.svg'
import privacyActive from '../assets/main-blocks/main-lock-black.svg'
import privacyDisable from '../assets/main-blocks/main-lock-gray.svg'

import manageImage from '../assets/main-blocks/main-setting-blue.svg'
import manageActive from '../assets/main-blocks/main-setting-black.svg'
import manageDisable from '../assets/main-blocks/main-setting-gray.svg'

import usageImage from '../assets/main-blocks/main-how-blue.svg'
import usageActive from '../assets/main-blocks/main-how-black.svg'
import usageDisable from '../assets/main-blocks/main-how-gray.svg'

import createAlbum from '../assets/api-blocks/add-circle.svg'
import createAlbumDisable from '../assets/api-blocks/add-circle-gray.svg'
import deleteAlbum from '../assets/api-blocks/delete.svg'
import deleteAlbumDisable from '../assets/api-blocks/delete-gray.svg'
import editAlbum from '../assets/api-blocks/edit-square.svg'
import editAlbumDisable from '../assets/api-blocks/edit-square-gray.svg'
import addAccess from '../assets/api-blocks/lock-open.svg'
import addAccessDisable from '../assets/api-blocks/lock-open-gray.svg'
import removeAccess from '../assets/api-blocks/lock.svg'
import removeAccessDisable from '../assets/api-blocks/lock-gray.svg'

import createImage from '../assets/api-blocks/upload.svg'
import createImageDisable from '../assets/api-blocks/upload-gray.svg'
import deleteImage from '../assets/api-blocks/backspace.svg'
import deleteImageDisable from '../assets/api-blocks/backspace-gray.svg'
import editImage from '../assets/api-blocks/edit.svg'
import editImageDisable from '../assets/api-blocks/edit-gray.svg'

export const mainBlocks = [
    {
        img: manageImage,
        imgActive: manageActive,
        imgDisable: manageDisable,
        title: 'Manage images',
        text: [
            'Uimage is a powerful and intuitive service that enables you to create, edit and delete images and albums with ease.',
            'With uimage, you can find other users, add their albums to favorites, and share album\'s and image\'s links with others.',
            'Our service is free and open to developers, allowing them to access our API to create, edit, delete images and albums as well as get direct links to them. See more in the API section of our service.',
            'Uimage is available on all devices.'
        ]
    },
    {
        img: privacyImage,
        imgActive: privacyActive,
        imgDisable: privacyDisable,
        title: 'Privacy',
        text: [
            'With uimage, you can create private albums that can only contain private images.',
            'You can grant and revoke access to these private albums to other users, and any direct links to these images will only be visible to those you have given permission to view. The links are also protected from interception, so you can feel secure in sharing them with others.',
            'Uimage is dedicated to protecting the privacy of its users and their data.',
        ]
    },
    {
        img: usageImage,
        imgActive: usageActive,
        imgDisable: usageDisable,
        title: 'How to use',
        text: [
            'You must be registered to use our service. For this, click the get started button and register. Now you have access to all the functionality of our site.',
            'You can also purchase a premium subscription to hide ads on our site and increase the amount of space available. For this, go to the premium tab and read the offers.',
            'Use the user panel to manage your account and albums. With its help, you can change account information, create, edit and delete albums, upload images.',
            'To control access to the private album, click the lock icon. If you want to add an album to favorites click on the star icon, click again to remove.',
            'Enjoy using our service!'
        ]
    },
]

export const apiBlocks = [
    {
        imgActive: createAlbum,
        imgDisable: createAlbumDisable,
        title: 'Create album',
        text: [
            "To create a new album, use the POST method with the address https://uimage.p.rapidapi.com/api/album",
            "The request body includes two fields: 'name' and 'isPrivate'.",
            "The request header must have the following fields: 'x-api-key', 'X-RapidAPI-Key', 'X-RapidAPI-Host', 'Content-Type'. Full instructions can be found at the link above."
        ]
    },
    {
        imgActive: deleteAlbum,
        imgDisable: deleteAlbumDisable,
        title: 'Delete album',
        text: [
            "To delete an album, use the DELETE method with the address https://uimage.p.rapidapi.com/api/album",
            "The query includes the 'name' field.",
            "The request header must have the following fields: 'x-api-key', 'X-RapidAPI-Key', 'X-RapidAPI-Host', 'Content-Type'. Full instructions can be found at the link above."
        ]
    },
    {
        imgActive: editAlbum,
        imgDisable: editAlbumDisable,
        title: 'Rename album',
        text: [
            "To rename an album, use the PUT method with the address https://uimage.p.rapidapi.com/api/album",
            "The request body includes two fields: 'name' and 'newName'.",
            "The request header must have the following fields: 'x-api-key', 'X-RapidAPI-Key', 'X-RapidAPI-Host', 'Content-Type'. Full instructions can be found at the link above."
        ]
    },
    {
        imgActive: addAccess,
        imgDisable: addAccessDisable,
        title: 'Allow access',
        text: [
            "To allow access, use the PUT method with the address https://uimage.p.rapidapi.com/api/album/access/add",
            "The request body includes two fields: 'albumName' and 'username'.",
            "The request header must have the following fields: 'x-api-key', 'X-RapidAPI-Key', 'X-RapidAPI-Host', 'Content-Type'. Full instructions can be found at the link above."
        ]
    },
    {
        imgActive: removeAccess,
        imgDisable: removeAccessDisable,
        title: 'Remove access',
        text: [
            "To remove access, use the PUT method with the address https://uimage.p.rapidapi.com/api/album/access/remove",
            "The request body includes two fields: 'albumName' and 'username'.",
            "The request header must have the following fields: 'x-api-key', 'X-RapidAPI-Key', 'X-RapidAPI-Host', 'Content-Type'. Full instructions can be found at the link above."
        ]
    },

    {
        imgActive: createImage,
        imgDisable: createImageDisable,
        title: 'Upload image',
        text: [
            "To upload image, use the POST method with the address https://uimage.p.rapidapi.com/api/image",
            "The request body includes three fields: 'imageName', 'base64string', 'albumName'.",
            "The request header must have the following fields: 'x-api-key', 'X-RapidAPI-Key', 'X-RapidAPI-Host', 'Content-Type'. Full instructions can be found at the link above."
        ]
    },
    {
        imgActive: deleteImage,
        imgDisable: deleteImageDisable,
        title: 'Delete image',
        text: [
            "To delete image, use the DELETE method with the address https://uimage.p.rapidapi.com/api/image",
            "The request query includes two fields: 'imageName' and 'albumName'.",
            "The request header must have the following fields: 'x-api-key', 'X-RapidAPI-Key', 'X-RapidAPI-Host', 'Content-Type'. Full instructions can be found at the link above."
        ]
    },
    {
        imgActive: editImage,
        imgDisable: editImageDisable,
        title: 'Rename image',
        text: [
            "To remove access, use the PUT method with the address https://uimage.p.rapidapi.com/api/image",
            "The request body includes three fields: 'albumName', 'imageName' and 'newName'.",
            "The request header must have the following fields: 'x-api-key', 'X-RapidAPI-Key', 'X-RapidAPI-Host', 'Content-Type'. Full instructions can be found at the link above."
        ]
    },
    
]