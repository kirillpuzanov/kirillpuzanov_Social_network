import {v1} from "uuid";
import {InferActionsTypes} from "./redux-store";

type ActionsTypes = InferActionsTypes<typeof profileActions>


export type PostDataType = {
    id: string
    message: string
    likes: number
}

let initialState = {
    postsData:
        [
            {id: v1(), message: 'Hi, how are you?', likes: 7},
            {id: v1(), message: 'Hi, how are you?', likes: 7},
            {id: v1(), message: 'Hallo, i am fine!', likes: 10}
        ] as Array<PostDataType>,
    newPostText: ''
};
type InitialStateType = typeof initialState;

export const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {
        case "ADD_POST":{
            const newPost = {id: v1(), message: action.newMessage, likes: 0}
            return {...state, postsData: [newPost, ...state.postsData]}
        }
        case "CHANGE_TEXTAREA": {
            return {...state, newPostText: action.newText }
        }
        default:
            return state
    }
}

export const profileActions = {
    addPostActionCreator: (newPostText: string) =>({
            type: 'ADD_POST', newMessage: newPostText
    }as const),
    changeTextAreaActionCreator:(newText: string)=>({
        type: 'CHANGE_TEXTAREA', newText: newText
    }as const),
}

