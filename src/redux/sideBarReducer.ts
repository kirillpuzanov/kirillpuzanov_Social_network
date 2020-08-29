import {ActionsTypes, objMyFriendType} from "./store";
import {v1} from "uuid";

type navBarPageType = {
    myFriends:Array<objMyFriendType>
}

let initialState = {
    myFriends: [
        {id: v1(), name: 'Victor'},
        {id: v1(), name: 'Sveta'},
        {id: v1(), name: 'Maksim'}
    ]
};

export const sideBarReducer = (state:navBarPageType = initialState,action:ActionsTypes) => {


    return state;
}