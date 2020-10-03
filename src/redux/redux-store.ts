
import {combineReducers, createStore} from "redux";
import {profileReducer} from "./profile-reducer";
import {usersReducer} from "./users-reducer";
import {dialogsReducer} from "./dialogs-reducer";
import {authReducer} from "./auth-reducer";



type RootReducersType = typeof reducers
export type AppStateType = ReturnType<RootReducersType>;

type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never
export type InferActionsTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesTypes<T>>



let reducers = combineReducers({
    profilePage:profileReducer,
    messagesPage:dialogsReducer,
    usersPage:usersReducer,
    auth: authReducer,
    // sideBar:sideBarReducer
});


export let store = createStore(reducers);
// @ts-ignore
window.store = store

