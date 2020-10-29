import {AppStateType, InferActionsTypes} from "./redux-store";
import {ThunkAction} from "redux-thunk";
import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {FormAction} from "redux-form/lib/actions";

//actions
export type authActionsType = InferActionsTypes<typeof authActions>

export const authActions = {
    setAuthUserDataAC: (data: authDataType,isAuth:boolean) => ({type: 'SET-USER-DATA', data,isAuth} as const),
}

//thunk's
type thunkType = ThunkAction<any, AppStateType, unknown, authActionsType | FormAction>

export const getAuthUserDataTC = (): thunkType => (dispatch) => {
    return authAPI.authMe().then((response) => {
        if (response.resultCode === 0) {
            dispatch(authActions.setAuthUserDataAC(response.data,true))
        }
    })
}
export const loginTC = (email: string, password: string, rememberMe: boolean ): thunkType => (dispatch) => {
      authAPI.login(email, password, rememberMe).then((response) => {
        if (response.resultCode === 0) {
            dispatch(getAuthUserDataTC())
        }else{
            let errorMessage = response.messages.length > 0 ? response.messages[0] : 'Some error';
            dispatch(stopSubmit('login',{_error:errorMessage}))
        }
    })
}
export const logoutTC = (): thunkType => (dispatch) => {
    authAPI.logout().then((response) => {
        if (response.resultCode === 0) {
            dispatch(authActions.setAuthUserDataAC({id: null,email:null,login:null},false))
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