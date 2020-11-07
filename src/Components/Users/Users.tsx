import React from 'react';
import {UserType} from '../../redux/users-reducer';
import {Paginator} from '../../common/Paginator/Paginator';
import {User} from './User';


type UsersType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    followingInProgress: string[]
    follow: (userId: string) => void
    unfollow: (userId: string) => void
    onPageChanged: (pageNumber: number) => void
}

export const Users = (props: UsersType) => {
    const {users, pageSize, totalUsersCount, currentPage, followingInProgress, follow, unfollow, onPageChanged} = props;

    return (
        <div>
            <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                       pageSize={pageSize} totalUsersCount={totalUsersCount}
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
