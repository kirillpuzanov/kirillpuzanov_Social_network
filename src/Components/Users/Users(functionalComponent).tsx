import React from 'react';
import {UserType} from "../../redux/users-reducer";
import style from './User.module.css';
import axios from 'axios';
import avaUserDefault from '../../assets/img/user-png-2.png';
export type UsersType = {
    users: Array<UserType>
    follow: (userId: string) => void
    unFollow: (userId: string) => void
    setUsers: (users: Array<UserType>) => void
}


export const UsersFunctionalComponent = (props: UsersType) => {

    const getUsers = ()=> {
        if(props.users.length === 0){
            axios.get<{items: Array<UserType>, totalCount: number, error: null | string}>('https://social-network.samuraijs.com/api/1.0/users')
                .then((response) =>{
                    props.setUsers(response.data.items)
                });
        }
    }
    return (
        <div>
            <button onClick={getUsers}> Get Users </button>
            {
            props.users.map(el => <div key={el.id}>
                <span>
                    <div className={style.PhotoAva}>
                        <img src={el.photos.small != null? el.photos.small : avaUserDefault }/> </div>
                    <div>
                        { el.followed
                            ? <button onClick={() => {

                                props.unFollow(el.id)
                            }}> Unfollow </button>

                            : <button onClick={() => {
                                props.follow(el.id)
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
        }</div>
    )
}