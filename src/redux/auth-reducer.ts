import {InferActionsTypes} from "./redux-store";


export type AuthStateType = {
    userId: null | number
    email: null | number
    login: null | number
    isFetching: null | boolean
    isAuth: boolean
}
export type authDataType = {
    id: null | number
    email: null | number
    login: null | number
}
export type authActionsType = InferActionsTypes<typeof authActions>

export const authActions = {
    setAuthUserDataAC: (data: authDataType) => ({type: 'SET-USER-DATA', data} as const),
}


const initialState: AuthStateType = {
    userId: null,
    email: null,
    login: null,
    isFetching: null,
    isAuth: false,
}

export const authReducer = (state = initialState, action: authActionsType): AuthStateType => {

    switch (action.type) {
        case 'SET-USER-DATA': {

            return {
                ...state,
                userId: action.data.id,
                email:action.data.email,
                login:action.data.login,
                isAuth: true
            }
        }
        default:
            return state;
    }
}


