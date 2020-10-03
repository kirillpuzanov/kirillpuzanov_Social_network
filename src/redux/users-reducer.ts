
import {InferActionsTypes} from "./redux-store";


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
}

export type UsersActionsType = InferActionsTypes<typeof usersActions>

export const usersActions = {
    followAC: (userId: string) => ({type: 'FOLLOW', userId: userId} as const),
    unFollowAC: (userId: string) => ({type: 'UNFOLLOW', userId: userId} as const),
    setUsersAC: (users: Array<UserType>) => ({type: 'SET_USERS', users: users} as const),
    setCurrentPageAC: (currentPage: number) => ({type: 'SET_CURRENT-PAGE', currentPage} as const),
    setTotalUsersCountAC: (totalUsersCount: number) => ({type: 'SET-TOTAL-USERS-COUNT', totalUsersCount} as const),
    toggleIsFetchingAC: (isFetching: boolean) => ({type: 'TOGGLE-IS-FETCHING', isFetching} as const),
}


const initialStateUsers: initialStateUsersType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
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
        default:
            return state;
    }
}


