import {AppStateType, InferActionsTypes} from "./redux-store";
import {ThunkAction} from "redux-thunk";
import {authAPI} from "../api/api";

//actions
export type authActionsType = InferActionsTypes<typeof authActions>

export const authActions = {
    setAuthUserDataAC: (data: authDataType,isAuth:boolean) => ({type: 'SET-USER-DATA', data,isAuth} as const),
}

//thunk's
type thunkType = ThunkAction<void, AppStateType, unknown, authActionsType>

export const getAuthUserDataTC = (): thunkType => (dispatch) => {
    authAPI.authMe().then((response) => {
        if (response.resultCode === 0) {
            dispatch(authActions.setAuthUserDataAC(response.data,true))
        }
    })
}
export const loginTC = (email: string, password: string, rememberMe: boolean ): thunkType => (dispatch) => {
    authAPI.login(email, password, rememberMe).then((response) => {
        if (response.resultCode === 0) {
            dispatch(getAuthUserDataTC())
        }
    })
}
export const logoutTC = (): thunkType => (dispatch) => {
    authAPI.logout().then((response) => {
        if (response.resultCode === 0) {
            dispatch(authActions.setAuthUserDataAC({id: null,login:null,email:null},false))
        }
    })
}


export const authReducer = (state = initialState, action: authActionsType): AuthStateType => {

    switch (action.type) {
        case 'SET-USER-DATA': {
            return {
                ...state,
                userId: action.data.id,
                email: action.data.email,
                login: action.data.login,
                isAuth: action.isAuth
            }
        }
        default:
            return state;
    }
}


export type AuthStateType = {
    userId: null | number
    email: null | string
    login: null | string
    isFetching: null | boolean
    isAuth: boolean
}
export type authDataType = {
    id: null | number
    email: null | string
    login: null | string
}
const initialState: AuthStateType = {
    userId: null,
    email: null,
    login: null,
    isFetching: null,
    isAuth: false,
}