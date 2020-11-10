import axios from "axios";
import {UserType} from "../redux/users-reducer";
import {authDataType} from "../redux/auth-reducer";
import {UserProfilePhotosType, UserProfileType} from '../redux/profile-reducer';


const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {'API-KEY': 'aee1e098-c1ec-45af-b764-0edfc4a89fa8'}
})

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },

    unfollow(userId: string) {
        return instance.delete<GetItemsType>(`follow/${userId}`)
    },

    follow(userId: string) {
        return instance.post<ResponseType>(`follow/${userId}`)
    },
}


export const authAPI = {
    authMe() {
        return instance.get<ResponseType<authDataType>>/*<{ data: authDataType, resultCode: number, messages: string[] }>*/('auth/me')
            .then(response => response.data)
    },
    login(email: string, password: string, rememberMe = false) {
        return instance.post<ResponseType<{ userId: number }>>/*<{ data: authDataType, resultCode: number, messages: string[], userId: number  }>*/('auth/login', {
            email,
            password,
            rememberMe
        }).then(response => response.data)
    },
    logout() {
        return instance.delete<ResponseType<authDataType>>/*<{ data: authDataType, resultCode: number, messages: string[] }>*/('auth/login')
            .then(response => response.data)
    },
}

export const profileAPI = {
    getProfile(userId: number | null) {
        return instance.get<UserProfileType>(`profile/${userId}`)
    },
    getStatus(userId: number | null) {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status: string) {
        return instance.put(`profile/status/`, {status: status})
    },
    updatePhoto(photoFile:File) {
        const formData = new FormData();
        formData.append('image',photoFile)
        return instance.put<ResponseType<UpdatePhotoResDataType>>(`profile/photo`, formData)
            .then(response => response.data)
    },
}

type UpdatePhotoResDataType = {photos:UserProfilePhotosType}
export type ResponseType<D = {}> = {
    data: D
    messages: Array<string>
    resultCode: 0 | 1 | 10
}

export type GetItemsType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}