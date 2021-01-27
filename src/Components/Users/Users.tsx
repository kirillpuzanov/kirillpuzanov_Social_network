import React from 'react';
import {FilterUserType, UserType} from '../../redux/users-reducer';
import {Paginator} from '../../common/Paginator/Paginator';
import {User} from './User';
import {UsersSearchForm} from './UsersSearchForm';


type UsersType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    followingInProgress: string[]
    follow: (userId: string) => void
    unfollow: (userId: string) => void
    onPageChanged: (pageNumber: number) => void
    onFilterChanged: (filter: FilterUserType) => void
}

export const Users = (props: UsersType) => {
    const {users, pageSize, totalUsersCount, currentPage, followingInProgress, follow, unfollow, onPageChanged} = props;

    return (
        <div>
            <UsersSearchForm onFilterChanged={props.onFilterChanged}/>

            <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                       pageSize={pageSize} totalUsersCount={totalUsersCount} portionSize={5}
            />
            {
                users.map(u => <User key={u.id} user={u}
                                     follow={follow} unfollow={unfollow}
                                     followingInProgress={followingInProgress}
                />)
            }
        </div>
    )
}


