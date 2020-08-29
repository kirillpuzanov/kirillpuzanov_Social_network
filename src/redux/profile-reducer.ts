import {v1} from "uuid";
import {ActionsTypes, AddPostType, ChangeTextareaType, objPostType} from "./store";


const ADD_POST = 'ADD-NEW-POST';
const CHANGE_TEXTAREA = 'CHANGE-TEXTAREA';

type ProfilePageType = {
    postsData: Array<objPostType>
    newPostText: string
}

let initialState = {
    postsData:
        [
            {id: v1(), message: 'Hi, how are you?', likes: 7},
            {id: v1(), message: 'Hi, how are you?', likes: 7},
            {id: v1(), message: 'Hallo, i am fine!', likes: 10}
        ],
    newPostText: ''
};

export const profileReducer = (state: ProfilePageType = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case ADD_POST:
            let newPost: objPostType = {id: v1(), message: action.newMessage, likes: 0}
            state.postsData.unshift(newPost);
            state.newPostText = '';
            return state;
        case CHANGE_TEXTAREA:
            state.newPostText = action.newText;
            return state
        default:
            return state;
    }
}
export const addPostActionCreator = (newPostText: string): AddPostType => {
    return {type: ADD_POST, newMessage: newPostText}
}
export const changeTextAreaActionCreator = (newText: string): ChangeTextareaType => {
    return {type: CHANGE_TEXTAREA, newText: newText}
}
