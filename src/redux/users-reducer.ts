import {AppStateType, InferActionsTypes} from './redux-store';
import {usersAPI} from '../api/api';
import {ThunkAction} from 'redux-thunk';

// actions
export type UsersActionsType = InferActionsTypes<typeof usersActions>

export const usersActions = {
    followSuccessAC: (userId: string) => ({type: '/USERS/FOLLOW', userId: userId} as const),
    unFollowSuccessAC: (userId: string) => ({type: '/USERS/UNFOLLOW', userId: userId} as const),
    setUsersAC: (users: Array<UserType>) => ({type: '/USERS/SET_USERS', users: users} as const),
    setCurrentPageAC: (currentPage: number) => ({type: '/USERS/SET_CURRENT-PAGE', currentPage} as const),
    setTotalUsersCountAC: (totalUsersCount: number) => ({
        type: '/USERS/SET-TOTAL-USERS-COUNT',
        totalUsersCount
    } as const),
    toggleIsFetchingAC: (isFetching: boolean) => ({type: '/USERS/TOGGLE-IS-FETCHING', isFetching} as const),
    toggleIsFollowingProgressAC: (isFetching: boolean, userId: string) => ({
        type: '/USERS/TOGGLE-IS-FOLLOWING=PROGRESS',
        isFetching,
        userId
    } as const),
}
// thunk's
type thunkType = ThunkAction<void, AppStateType, unknown, UsersActionsType>

export const getUsersTC = (currentPage: number, pageSize: number): thunkType => async (dispatch, getState) => {
    dispatch(usersActions.toggleIsFetchingAC(true))
    let response = await usersAPI.getUsers(currentPage, pageSize)
    dispatch(usersActions.toggleIsFetchingAC(false))
    dispatch(usersActions.setUsersAC(response.items))
    dispatch(usersActions.setTotalUsersCountAC(response.totalCount))
}

const followUnfollowFlow = async (dispatch: any, userId: any, apiMethod: any, actionCreator: any) => {
    dispatch(usersActions.toggleIsFollowingProgressAC(true, userId))
    let response = await apiMethod(userId)
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(usersActions.toggleIsFollowingProgressAC(false, userId))
}

export const followTC = (userId: string): thunkType => {
    return async (dispatch, getState) => {
        followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), usersActions.followSuccessAC)
    }
}

export const unfollowTC = (userId: string): thunkType => {
    return async (dispatch, getState) => {
        let apiMethod = usersAPI.unfollow.bind(usersAPI);
        let actionCreator = usersActions.unFollowSuccessAC;
        followUnfollowFlow(dispatch, userId, apiMethod, actionCreator)
    }
}

const initialStateUsers: initialStateUsersType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
    userId: '',
}

export const usersReducer = (state = initialStateUsers, action: UsersActionsType): initialStateUsersType => {
    switch (action.type) {
        case '/USERS/FOLLOW': {
            return {
                ...state,
                users: state.users.map(el => el.id === action.userId ? {...el, followed: true} : el)
            }
        }
        case '/USERS/UNFOLLOW': {
            return {
                ...state,
                users: state.users.map(el => el.id === action.userId ? {...el, followed: false} : el)
            }
        }
        case '/USERS/SET_USERS': {
            return {...state, users: [...action.users]}
        }
        case '/USERS/SET_CURRENT-PAGE': {
            return {...state, currentPage: action.currentPage}
        }
        case '/USERS/SET-TOTAL-USERS-COUNT': {
            return {...state, totalUsersCount: action.totalUsersCount}
        }
        case '/USERS/TOGGLE-IS-FETCHING': {
            return {...state, isFetching: action.isFetching}
        }
        case '/USERS/TOGGLE-IS-FOLLOWING=PROGRESS': {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        }
        default:
            return state;
    }
}


type UserLocationType = {
    city: string
    country: string
}
export type UserType = {
    id: string
    photoUrl?: string
    followed: boolean
    name: string
    status: string
    location: UserLocationType
    photos: {
        small: string
        large: string
    }
}
export type initialStateUsersType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: string[]
    userId: string
}