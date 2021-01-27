import {AppStateType} from '../redux-store';
import {createSelector} from 'reselect';


const takeUsersSelector = (state: AppStateType) => {
    return state.usersPage.users
}
export const takeUsers = createSelector(takeUsersSelector, (users) => {
    return users.filter(el => true)
})

export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize
}

export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount
}

export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage
}

export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching
}

export const getFollowingInProgress = (state: AppStateType) => {
    return state.usersPage.followingInProgress
}
export const getUsersFilter = (state: AppStateType) => {
    return state.usersPage.filter
}
