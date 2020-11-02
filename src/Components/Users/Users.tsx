import React from "react";
import style from "./Users.module.css";
import avaUserDefault from "../../assets/img/user-png-2.png";
import {UserType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";


type UsersType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    followingInProgress: string[]
    followSuccess: (userId: string) => void
    unFollowSuccess: (userId: string) => void
    follow: (userId: string) => void
    unfollow: (userId: string) => void
    onPageChanged: (pageNumber: number) => void
}

export const Users = (props: UsersType) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    return (
        <div>
            <div>
                {
                    pages.map((p) => <span key={Math.random()}
                                           onClick={() => props.onPageChanged(p)}
                                           className={props.currentPage === p ? style.selectedMode : ''}>{p}</span>)
                }
            </div>
            {
                props.users.map(el => <div key={el.id}>
                <span>

                    <div className={style.PhotoAva}>
                        <NavLink to={'/profile/' + el.id}>
                        <img src={el.photos.small != null ? el.photos.small : avaUserDefault}/>
                        </NavLink>
                    </div>
                    <div>
                        {el.followed
                            ? <button disabled={props.followingInProgress.some(id => id === el.id)}
                                      onClick={() => {
                                          props.unfollow(el.id)
                                      }}>
                                Unfollow
                            </button>
                            : <button disabled={props.followingInProgress.some(id => id === el.id)}
                                      onClick={() => {
                                          props.follow(el.id)
                                      }}>
                                Follow
                            </button>
                        }
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
