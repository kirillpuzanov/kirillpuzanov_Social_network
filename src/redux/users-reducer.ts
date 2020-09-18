import {v1} from "uuid";
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
}

export type UsersActionsType = InferActionsTypes<typeof usersActions>

export const usersActions = {
    followAC: (userId: string) => ({type: 'FOLLOW', userId: userId} as const),
    unFollowAC: (userId: string) => ({type: 'UNFOLLOW', userId: userId} as const),
    setUsersAC: (users: Array<UserType>) => ({type: 'SET_USERS', users: users} as const)
}


const initialStateUsers: initialStateUsersType = {
    users:[]
}

export const usersReducer = (state = initialStateUsers , action: UsersActionsType): initialStateUsersType => {
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
                return {...state, users: [...state.users, ...action.users]}
            }
            default:
                return state;
        }
}


