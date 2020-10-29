import {AppStateType, InferActionsTypes} from './redux-store';
import {ThunkAction} from 'redux-thunk';
import {FormAction} from 'redux-form/lib/actions';
import {getAuthUserDataTC} from './auth-reducer';

//actions
export type appActionsType = InferActionsTypes<typeof appActions>

export const appActions = {
    initializedAppAC: () => ({type: 'INITIALIZED-APP'} as const),
}

//thunk's
type thunkType = ThunkAction<void, AppStateType, unknown, appActionsType | FormAction>

export const initializeAppTC = (): thunkType => (dispatch) => {
    let promise = dispatch(getAuthUserDataTC())
    promise.then(() => {
            dispatch( appActions.initializedAppAC())
    })
}
export const appReducer = (state = initialState, action: appActionsType): initialStateType => {

    switch (action.type) {
        case 'INITIALIZED-APP': {
            return {
                ...state,
                initialized: true
            }
        }
        default:
            return state;
    }
}


export type initialStateType = {
    initialized: boolean
}
const initialState: initialStateType = {
    initialized: false
}
