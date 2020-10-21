
import {applyMiddleware, combineReducers, createStore} from "redux";
import {profileReducer} from "./profile-reducer";
import {usersReducer} from "./users-reducer";
import {dialogsReducer} from "./dialogs-reducer";
import {authReducer} from "./auth-reducer";
import thunkMiddleware from'redux-thunk';
import { reducer as formReducer } from 'redux-form'


type RootReducersType = typeof reducers
export type AppStateType = ReturnType<RootReducersType>;

type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never
export type InferActionsTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesTypes<T>>



let reducers = combineReducers({
    profilePage:profileReducer,
    messagesPage:dialogsReducer,
    usersPage:usersReducer,
    auth: authReducer,
    form: formReducer,
    // sideBar:sideBarReducer
});


export let store = createStore(reducers,applyMiddleware(thunkMiddleware));
// @ts-ignore
window.store = store

