import {v1} from "uuid";
import {InferActionsTypes} from "./redux-store";

type ActionsTypes = InferActionsTypes<typeof profileActions>


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
    photos: { small: string; large: string } ;
}

let initialState = {
    postsData:
        [
            {id: v1(), message: 'Hi, how are you?', likes: 7},
            {id: v1(), message: 'Hi, how are you?', likes: 7},
            {id: v1(), message: 'Hallo, i am fine!', likes: 10}
        ] as Array<PostDataType>,
    newPostText: '',
    userProfile: null as null | UserProfileType,
};
export type InitialStateProfileType = typeof initialState;

export const profileReducer = (state = initialState, action: ActionsTypes): InitialStateProfileType => {

    switch (action.type) {
        case "ADD_POST": {
            const newPost = {id: v1(), message: action.newMessage, likes: 0}
            return {...state, newPostText: '', postsData: [newPost, ...state.postsData]}
        }
        case "CHANGE_TEXTAREA": {
            return {...state, newPostText: action.newText}
        }
        case 'SET-USER-PROFILE': {
            return {...state, userProfile: action.userProfile}
        }
        default:
            return state
    }
}

export const profileActions = {
    addPostActionCreator: (newPostText: string) => ({
        type: 'ADD_POST', newMessage: newPostText
    } as const),
    changeTextAreaActionCreator: (newText: string) => ({
        type: 'CHANGE_TEXTAREA', newText: newText
    } as const),
    setUserProfileAC: (userProfile: UserProfileType) => ({
        type: 'SET-USER-PROFILE', userProfile
    } as const),
}




