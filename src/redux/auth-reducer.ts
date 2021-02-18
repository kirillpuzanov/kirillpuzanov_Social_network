import {AppStateType, InferActionsTypes} from './redux-store';
import {ThunkAction} from 'redux-thunk';
import {authAPI, ResultCodeForCapcthaEnum, ResultCodesEnum, securityAPI} from '../api/api';
import {stopSubmit} from 'redux-form';
import {FormAction} from 'redux-form/lib/actions';


const initialState: AuthStateType = {
    userId: null,
    email: null,
    login: null,
    isFetching: null,
    isAuth: false,
    captchaUrl: null,
}

export const authReducer = (state = initialState, action: authActionsType): AuthStateType => {

    switch (action.type) {
        case '/AUTH/SET-USER-DATA':
            return {
                ...state,
                userId: action.data.id,
                email: action.data.email,
                login: action.data.login,
                isAuth: action.isAuth,
            }
        case '/AUTH/SET-CAPTHA-SUCCESS':
            return {...state, captchaUrl: action.captchaUrl}
        default:
            return state;
    }
}

//action's
export type authActionsType = InferActionsTypes<typeof authActions>

export const authActions = {
    setAuthUserDataAC: (data: authDataType, isAuth: boolean) => ({type: '/AUTH/SET-USER-DATA', data, isAuth} as const),
    setCaptchaUrl: (captchaUrl: string) => ({type: '/AUTH/SET-CAPTHA-SUCCESS', captchaUrl} as const),

}

//thunk's
 type thunkType = ThunkAction<any, AppStateType, unknown, authActionsType | FormAction>

export const getAuthUserDataTC = (): thunkType => async (dispatch) => {
    let response = await authAPI.authMe();
    if (response.resultCode === ResultCodesEnum.Success) {
        dispatch(authActions.setAuthUserDataAC(response.data, true))
    }
}

export const loginTC = (email: string, password: string, rememberMe: boolean,captcha:string): thunkType => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe,captcha);
    if (response.resultCode === ResultCodesEnum.Success) {
        dispatch(getAuthUserDataTC())
    } else {
        if (response.resultCode === ResultCodeForCapcthaEnum.CaptchaIsRequired) {
            dispatch(getCapthaUrlTC())
        }
        let errorMessage = response.messages.length > 0 ? response.messages[0] : 'Some error';
        dispatch(stopSubmit('login', {_error: errorMessage}))
    }
}
export const logoutTC = (): thunkType => async (dispatch) => {
    let response = await authAPI.logout()
    if (response.resultCode === ResultCodesEnum.Success) {
        dispatch(authActions.setAuthUserDataAC({id: null, email: null, login: null}, false))
    }
}

export const getCapthaUrlTC = (): thunkType => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl()
    dispatch(authActions.setCaptchaUrl(response.url))
}


//type's
export type AuthStateType = {
    userId: null | number
    email: null | string
    login: null | string
    isFetching: null | boolean
    isAuth: boolean
    captchaUrl: null | string
}
export type authDataType = {
    id: null | number
    email: null | string
    login: null | string
}

