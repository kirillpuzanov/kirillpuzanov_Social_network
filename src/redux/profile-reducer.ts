import {v1} from 'uuid';
import {AppStateType, InferActionsTypes} from './redux-store';
import {profileAPI} from '../api/api';
import {ThunkAction} from 'redux-thunk';

// actions
type ProfileActionsTypes = InferActionsTypes<typeof profileActions>
export const profileActions = {
    addPostActionCreator: (newPostText: string) => ({
        type: '/PROFILE/ADD_POST', newPostText
    } as const),
    setUserProfileAC: (userProfile: UserProfileType) => ({
        type: '/PROFILE/SET-USER-PROFILE', userProfile
    } as const),
    setStatusAC: (status: string) => ({
        type: '/PROFILE/SET-STATUS', status
    } as const),
    updatePhotoAC: (photos:UserProfilePhotosType) => ({
        type: '/PROFILE/UPDATE-PHOTO', photos
    } as const),
}

//thunk's
type thunkType = ThunkAction<void, AppStateType, unknown, ProfileActionsTypes>
export const getUserProfileTC = (userId: number | null): thunkType => async (dispatch) => {
    let response = await profileAPI.getProfile(userId)
    dispatch(profileActions.setUserProfileAC(response.data))
}

export const getStatusTC = (userId: number | null): thunkType => async (dispatch) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(profileActions.setStatusAC(response.data))
}

export const updateStatusTC = (status: string): thunkType => async (dispatch) => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(profileActions.setStatusAC(status))
    }
}

export const updatePhotoTC = (file:File): thunkType => async (dispatch) => {
    let response = await profileAPI.updatePhoto(file)
    if (response.resultCode === 0) {
        dispatch(profileActions.updatePhotoAC(response.data.photos))
    }
}

let initialState = {
    postsData:
        [
            {id: v1(), message: 'Hi, how are you?', likes: 7},
            {id: v1(), message: 'Hi, how are you?', likes: 7},
            {id: v1(), message: 'Hallo, i am fine!', likes: 10}
        ] as Array<PostDataType>,
    userProfile: null as UserProfileType | null,
    status: '',
};
export type InitialStateProfileType = typeof initialState;

export const profileReducer = (state = initialState, action: ProfileActionsTypes): InitialStateProfileType => {

    switch (action.type) {
        case '/PROFILE/ADD_POST': {
            const newPost = {id: v1(), message: action.newPostText, likes: 0}
            return {...state, postsData: [newPost, ...state.postsData]}
        }
        case '/PROFILE/SET-USER-PROFILE': {
            return {...state, userProfile: action.userProfile}
        }
        case '/PROFILE/SET-STATUS': {
            return {...state, status: action.status}
        }
        case '/PROFILE/UPDATE-PHOTO':{
            return{ ...state, userProfile: {...state.userProfile, photos:action.photos} as UserProfileType}
        }
        default:
            return state
    }
}


export type PostDataType = {
    id: string
    message: string
    likes: number
}
type contactsType = {
    facebook: string
    website: string | null
    vk: string
    twitter: string
    instagram: string
    youtube: string | null
    github: string
    mainLink: string
}
export type UserProfilePhotosType = {
    small: string
    large: string
}
export type UserProfileType = {
    aboutMe: string
    contacts: contactsType
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    userId: number
    photos: UserProfilePhotosType
}