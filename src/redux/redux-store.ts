import React from 'react';
import {combineReducers, createStore} from "redux";
import {profileReducer} from "./profile-reducer";
import {messagesReducer} from "./message-reducer";
// import {sideBarReducer} from "./sideBarReducer";


type RootReducersType = typeof reducers
export type AppStateType = ReturnType<RootReducersType>;

type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never
export type InferActionsTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesTypes<T>>



let reducers = combineReducers({
    profilePage:profileReducer,
    messagesPage:messagesReducer,
    // sideBar:sideBarReducer
});
/*export type storeType = {
    _state: stateType
    _callSubscriber: (_state: stateType) => void
    getState: () => stateType
    subscribe: (observer: (_state: stateType) => void) => void
    dispatch: (action: ActionsTypes) => void

}*/

export let store = createStore(reducers);

