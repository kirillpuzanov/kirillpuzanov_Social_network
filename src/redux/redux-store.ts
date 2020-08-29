import React from 'react';
import {combineReducers, createStore} from "redux";
import {ActionsTypes, stateType} from "./store";
import {profileReducer} from "./profile-reducer";
import {messagesReducer} from "./message-reducer";
import {sideBarReducer} from "./sideBarReducer";


let reducers = combineReducers({
    profilePage:profileReducer,
    messagesPage:messagesReducer,
    sideBar:sideBarReducer
});
export type storeType = {
    _state: stateType
    _callSubscriber: (_state: stateType) => void
    getState: () => stateType
    subscribe: (observer: (_state: stateType) => void) => void
    dispatch: (action: ActionsTypes) => void

}
export let store: storeType = createStore(reducers);
