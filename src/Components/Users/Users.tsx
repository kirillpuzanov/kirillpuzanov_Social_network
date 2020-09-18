import React from 'react';
import {UserType} from "../../redux/users-reducer";
import style from './Users.module.css';
import axios from 'axios';
import avaUserDefault from '../../assets/img/user-png-2.png';

export type UsersType = {
    users: Array<UserType>
    follow: (userId: string) => void
    unFollow: (userId: string) => void
    setUsers: (users: Array<UserType>) => void
}

// в React.Component<UsersType, Array<UserType>>  : < тип пропсов самой компоненты, тип стейта, который возвращает response >
export class Users extends React.Component<UsersType, Array<UserType>> {

    componentDidMount() {
        axios.get<{ items: Array<UserType>, totalCount: number, error: null | string }>('https://social-network.samuraijs.com/api/1.0/users')
            .then((response) => {
                this.props.setUsers(response.data.items)
            });
    }
    render() {
        return (
            <div>
                {
                    this.props.users.map(el => <div key={el.id}>
                <span>
                    <div className={style.PhotoAva}>
                        <img src={el.photos.small != null ? el.photos.small : avaUserDefault}/> </div>
                    <div>
                        {el.followed
                            ? <button onClick={() => {
                                this.props.unFollow(el.id)
                            }}> Unfollow </button>

                            : <button onClick={() => {
                                this.props.follow(el.id)
                            }}> Follow </button>}
                    </div>
                </span>
                        <span>
                    <span>
                        <div>{el.name}</div>
                        <div>{el.status}</div>
                    </span>
                    <span>
                        <div>{'el.location.country'}</div>
                        <div>{'el.location.city'}</div>
                    </span>
                </span>
                    </div>)
                }
            </div>
        )
    }
}