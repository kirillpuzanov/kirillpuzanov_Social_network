import axios from 'axios';
import {UserType} from '../redux/users-reducer';
import {authDataType} from '../redux/auth-reducer';
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
        return instance.delete<ResponseType>(`follow/${userId}`)
            .then(res => res.data)
    },

    follow(userId: string) {
        return instance.post<ResponseType>(`follow/${userId}`)
            .then(res => res.data)
    },
}


export const authAPI = {
    authMe() {
        return instance.get<ResponseType<authDataType>>('auth/me')
            .then(response => response.data)
    },
    login(email: string, password: string, rememberMe = false, captcha: string) {
        return instance.post<ResponseType<LoginResponseDataType, ResultCodesEnum | ResultCodeForCapcthaEnum>>('auth/login', {
            email,
            rememberMe,
            captcha
        }).then(response => response.data)
    },
    logout() {
        return instance.delete<ResponseType<authDataType>>('auth/login')
            .then(response => response.data)
    },
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<{ url: string }>('security/get-captcha-url')
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
    updatePhoto(photoFile: File) {
        const formData = new FormData();
        formData.append('image', photoFile)
        return instance.put<ResponseType<UpdatePhotoResDataType>>(`profile/photo`, formData)
            .then(response => response.data)
    },
    saveProfile(profile: UserProfileType) {
        return instance.put<ResponseType>(`profile`, profile)
            .then((res) => res.data)
    },
}

type UpdatePhotoResDataType = { photos: UserProfilePhotosType }

export type ResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}
type LoginResponseDataType = {
    userId: number
}

export type GetItemsType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}

export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}

export enum ResultCodeForCapcthaEnum {
    CaptchaIsRequired = 10
}