import {AppStateType, InferActionsTypes} from "./redux-store";
import {usersAPI} from "../api/api";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";


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

export type UsersActionsType = InferActionsTypes<typeof usersActions>

export const usersActions = {
    followSuccessAC: (userId: string) => ({type: 'FOLLOW', userId: userId} as const),
    unFollowSuccessAC: (userId: string) => ({type: 'UNFOLLOW', userId: userId} as const),
    setUsersAC: (users: Array<UserType>) => ({type: 'SET_USERS', users: users} as const),
    setCurrentPageAC: (currentPage: number) => ({type: 'SET_CURRENT-PAGE', currentPage} as const),
    setTotalUsersCountAC: (totalUsersCount: number) => ({type: 'SET-TOTAL-USERS-COUNT', totalUsersCount} as const),
    toggleIsFetchingAC: (isFetching: boolean) => ({type: 'TOGGLE-IS-FETCHING', isFetching} as const),
    toggleIsFollowingProgressAC: (isFetching: boolean, userId: string) => ({
        type: 'TOGGLE-IS-FOLLOWING=PROGRESS',
        isFetching,
        userId
    } as const),
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
        case 'FOLLOW': {
            return {
                ...state,
                users: state.users.map(el => {
                    if (el.id === action.userId) {
                        return {...el, followed: true}
                    }
                    return el;
                })
            }
        }
        case 'UNFOLLOW': {
            return {
                ...state,
                users: state.users.map(el => {
                    if (el.id === action.userId) {
                        return {...el, followed: false}
                    }
                    return el;
                })
            }
        }
        case 'SET_USERS': {
            return {...state, users: [...action.users]}
        }
        case 'SET_CURRENT-PAGE': {
            return {...state, currentPage: action.currentPage}
        }
        case 'SET-TOTAL-USERS-COUNT': {
            return {...state, totalUsersCount: action.totalUsersCount}
        }
        case "TOGGLE-IS-FETCHING": {
            return {...state, isFetching: action.isFetching}
        }
        case 'TOGGLE-IS-FOLLOWING=PROGRESS': {
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

type thunkType = ThunkAction<void, AppStateType, unknown, UsersActionsType>

export const getUsersTC = (currentPage: number, pageSize: number): thunkType => (dispatch, getState) => {
    dispatch(usersActions.toggleIsFetchingAC(true))
    usersAPI.getUsers(currentPage, pageSize)
        .then((response) => {
            dispatch(usersActions.toggleIsFetchingAC(false))
            dispatch(usersActions.setUsersAC(response.items))
            dispatch(usersActions.setTotalUsersCountAC(response.totalCount))
        });

}
export const followTC = (userId: string): thunkType => {
    return (dispatch, getState) => {
        dispatch(usersActions.toggleIsFollowingProgressAC(true, userId))
        usersAPI.follow(userId)
            .then((response) => {
                if (response.data.resultCode === 0) {
                    dispatch(usersActions.followSuccessAC(userId))
                }
                dispatch(usersActions.toggleIsFollowingProgressAC(false, userId))
            });
    }
}

export const unfollowTC = (userId: string): thunkType => {
    return (dispatch, getState) => {
        dispatch(usersActions.toggleIsFollowingProgressAC(true, userId))
        usersAPI.unfollow(userId)
            .then((response) => {
                if (response.data.resultCode === 0) {
                    dispatch(usersActions.unFollowSuccessAC(userId))
                }
                dispatch(usersActions.toggleIsFollowingProgressAC(false, userId))
            });
    }
}
// 1) Вариант типизации Thunk
// type getStateType = ()=> AppStateType
// type dispatchType = Dispatch<UsersActionsType>
// export const getUsersTC = (currentPage: number, pageSize: number) => (dispatch: dispatchType, getState:getStateType) => {
//     dispatch(usersActions.toggleIsFetchingAC(true))
//     usersAPI.getUsers(currentPage, pageSize).then((response) => {
//         dispatch(usersActions.toggleIsFetchingAC(false))
//         dispatch(usersActions.setUsersAC(response.items))
//         dispatch(usersActions.setTotalUsersCountAC(response.totalCount))
//     });
// }