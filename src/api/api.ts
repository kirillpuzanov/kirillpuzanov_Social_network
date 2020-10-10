import axios from "axios";
import {UserType} from "../redux/users-reducer";
import {authDataType} from "../redux/auth-reducer";
import {UserProfileType} from "../redux/profile-reducer";


const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {'API-KEY': 'aee1e098-c1ec-45af-b764-0edfc4a89fa8'}
})

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get<{ items: Array<UserType>, totalCount: number, error: null | string }>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },

    unfollow(userId: string) {
        return instance.delete<{ resultCode: number, messages: string[], data: any }>(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`)
    },

    follow(userId: string) {
        return instance.post<{ resultCode: number, messages: string[], data: any }>(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`)
    },
}


export const headerAPI = {
    getAuth() {
        return instance.get<{ data: authDataType, resultCode: number, messages: string[] }>('auth/me',)
            .then(response => response.data)
    }

}

export const profileAPI = {
    getUser(userId: string) {
        return axios.get<UserProfileType>(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
    }
}