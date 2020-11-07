import React from 'react';
import style from './User.module.css';
import avaUserDefault from '../../assets/img/user-png-2.png';
import {UserType} from '../../redux/users-reducer';
import {NavLink} from 'react-router-dom';


type UsersType = {
    user: UserType
    followingInProgress: string[]
    follow: (userId: string) => void
    unfollow: (userId: string) => void

}

export const User = (props: UsersType) => {
    const {user, followingInProgress, follow, unfollow} = props;
    return (
        <div>
            <div key={user.id}>
                <span>
                    <div className={style.PhotoAva}>
                        <NavLink to={'/profile/' + user.id}>
                        <img alt={'ava'} src={user.photos.small != null ? user.photos.small : avaUserDefault}/>
                        </NavLink>
                    </div>
                    <div>
                        {user.followed
                            ? <button disabled={followingInProgress.some(id => id === user.id)}
                                      onClick={() => {
                                          unfollow(user.id)
                                      }}>
                                Unfollow
                            </button>
                            : <button disabled={followingInProgress.some(id => id === user.id)}
                                      onClick={() => {
                                          follow(user.id)
                                      }}>
                                Follow
                            </button>
                        }
                    </div>
                </span>
                <span>
                    <span>
                        <div>{user.name}</div>
                        <div>{user.status}</div>
                    </span>
                    <span>
                        <div>{'user.location.country'}</div>
                        <div>{'user.location.city'}</div>
                    </span>
                </span>
            </div>
        </div>
    )
}
