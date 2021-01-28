import {AppStateType, InferActionsTypes} from './redux-store';
import {ResponseType, ResultCodesEnum, usersAPI} from '../api/api';
import {ThunkAction} from 'redux-thunk';
import {Dispatch} from 'redux';


const initialStateUsers = {
    users: [] as Array<UserType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<string>,
    userId: '',
    filter: {
        searchUserName: '',
        friend: null as null | boolean,
    }
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
        case '/USERS/SET_FILTER' : {
            return {...state, filter: action.payload}
        }
        default:
            return state;
    }
}

// actions
export type UsersActionsType = InferActionsTypes<typeof usersActions>

export const usersActions = {
    followSuccessAC: (userId: string) => ({type: '/USERS/FOLLOW', userId: userId} as const),
    unFollowSuccessAC: (userId: string) => ({type: '/USERS/UNFOLLOW', userId: userId} as const),
    setUsersAC: (users: Array<UserType>) => ({type: '/USERS/SET_USERS', users: users} as const),
    setCurrentPageAC: (currentPage: number) => ({type: '/USERS/SET_CURRENT-PAGE', currentPage} as const),
    setFilter: (filter: FilterUserType) => ({type: '/USERS/SET_FILTER', payload: filter} as const),
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

export const getUsersTC = (currentPage: number,
                           pageSize: number, filter: FilterUserType): thunkType => async (dispatch) => {

    dispatch(usersActions.toggleIsFetchingAC(true))
    dispatch(usersActions.setCurrentPageAC(currentPage))
    dispatch(usersActions.setFilter(filter))

    let response = await usersAPI.getUsers(currentPage, pageSize, filter.searchUserName, filter.friend)
    dispatch(usersActions.toggleIsFetchingAC(false))
    dispatch(usersActions.setUsersAC(response.items))
    dispatch(usersActions.setTotalUsersCountAC(response.totalCount))
}

const followUnfollowFlow = async (dispatch: Dispatch<UsersActionsType>,
                                  userId: string,
                                  apiMethod: (userId: string) => Promise<ResponseType>,
                                  actionCreator: (userId: string) => UsersActionsType) => {
    dispatch(usersActions.toggleIsFollowingProgressAC(true, userId))
    let response = await apiMethod(userId)
    if (response.resultCode === ResultCodesEnum.Success) {
        dispatch(actionCreator(userId))
    }
    dispatch(usersActions.toggleIsFollowingProgressAC(false, userId))
}

export const followTC = (userId: string): thunkType => {
    return async (dispatch) => {
        await followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), usersActions.followSuccessAC)
    }
}

export const unFollowTC = (userId: string): thunkType => {
    return async (dispatch) => {
        let apiMethod = usersAPI.unfollow.bind(usersAPI);
        let actionCreator = usersActions.unFollowSuccessAC;
        await followUnfollowFlow(dispatch, userId, apiMethod, actionCreator)
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
export type initialStateUsersType = typeof initialStateUsers
export type FilterUserType = typeof initialStateUsers.filter