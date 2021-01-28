import React, {useEffect} from 'react';
import {FilterUserType, followTC, getUsersTC, unFollowTC, UserType} from '../../redux/users-reducer';
import {Paginator} from '../../common/Paginator/Paginator';
import {User} from './User';
import {UsersSearchForm} from './UsersSearchForm';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount, getUsersFilter, getUsers
} from '../../redux/selectors/users-selectors';


type UsersType = {}

export const Users = (props: UsersType) => {


    const totalUsersCount = useSelector<AppStateType, number>(getTotalUsersCount);
    const currentPage = useSelector<AppStateType, number>(getCurrentPage)
    const users = useSelector<AppStateType, Array<UserType>>(getUsers);
    const pageSize = useSelector<AppStateType, number>(getPageSize);
    const followingInProgress = useSelector<AppStateType, Array<string>>(getFollowingInProgress);
    const filter = useSelector(getUsersFilter)

    const dispatch = useDispatch();

    useEffect( ()=> {
        dispatch(getUsersTC(currentPage, pageSize, filter))
    },[])

    const onPageChanged = (pageNumber: number) => {
        dispatch(getUsersTC(pageNumber, pageSize, filter))
    }

    const onFilterChanged = (filter: FilterUserType) => {
        dispatch(getUsersTC(1, pageSize, filter))
    }
    const follow = (userId: string) => {
        dispatch( followTC)
    }
    const unFollow = (userId: string) => {
        dispatch( unFollowTC)
    }

    return (
        <div>
            <UsersSearchForm onFilterChanged={onFilterChanged}/>

            <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                       pageSize={pageSize} totalUsersCount={totalUsersCount} portionSize={5}
            />
            {
                users.map(u => <User key={u.id} user={u}
                                     follow={follow} unfollow={unFollow}
                                     followingInProgress={followingInProgress}
                />)
            }
        </div>
    )
}


