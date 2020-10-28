import {v1} from "uuid";
import {AppStateType, InferActionsTypes} from "./redux-store";
import {profileAPI} from "../api/api";
import {ThunkAction} from "redux-thunk";

type ProfileActionsTypes = InferActionsTypes<typeof profileActions>


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
export type UserProfileType = {
    aboutMe: string
    contacts: contactsType
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    userId: number
    photos: { small: string; large: string };
}

let initialState = {
    postsData:
        [
            {id: v1(), message: 'Hi, how are you?', likes: 7},
            {id: v1(), message: 'Hi, how are you?', likes: 7},
            {id: v1(), message: 'Hallo, i am fine!', likes: 10}
        ] as Array<PostDataType>,
    userProfile: null as null | UserProfileType,
    status: '',
};
export type InitialStateProfileType = typeof initialState;

export const profileReducer = (state = initialState, action: ProfileActionsTypes): InitialStateProfileType => {

    switch (action.type) {
        case "ADD_POST": {
            const newPost = {id: v1(), message: action.newPostText, likes: 0}
            return {...state, postsData: [newPost, ...state.postsData]}
        }
        case 'SET-USER-PROFILE': {
            return {...state, userProfile: action.userProfile}
        }
        case "SET-STATUS": {
            return {...state, status: action.status}
        }
        default:
            return state
    }
}

export const profileActions = {
    addPostActionCreator: (newPostText: string) => ({
        type: 'ADD_POST', newPostText
    } as const),
    setUserProfileAC: (userProfile: UserProfileType) => ({
        type: 'SET-USER-PROFILE', userProfile
    } as const),
    setStatusAC: (status: string) => ({
        type: 'SET-STATUS', status
    } as const),
}

type thunkType = ThunkAction<void, AppStateType, unknown, ProfileActionsTypes>

export const getUserProfileTC = (userId: string): thunkType => (dispatch) => {
    profileAPI.getProfile(userId).then((response) => {
        dispatch(profileActions.setUserProfileAC(response.data))
    });
}

export const getStatusTC = (userId: string): thunkType => (dispatch) => {
    profileAPI.getStatus(userId).then((response) => {
        dispatch(profileActions.setStatusAC(response.data))
    })
}

export const updateStatusTC = (status: string): thunkType => (dispatch) => {
    profileAPI.updateStatus(status).then((response) => {
        if (response.data.resultCode === 0) {
            dispatch(profileActions.setStatusAC(status))
        }
    })
}


