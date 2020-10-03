import React from "react";
import style from "./Users.module.css";
import avaUserDefault from "../../assets/img/user-png-2.png";
import {UserType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";
import axios from "axios";

type UserssType = {
    users: Array<UserType>
    follow: (userId: string) => void
    unFollow: (userId: string) => void
    pageSize: number
    totalUsersCount: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
}

export const Users = (props: UserssType) => {
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
                            ? <button onClick={() => {
                                axios.delete<{resultCode:number, messages:string[],data:any }>(`https://social-network.samuraijs.com/api/1.0/follow/${el.id}`,{withCredentials:true, headers:{'API-KEY':'aee1e098-c1ec-45af-b764-0edfc4a89fa8'}})
                                    .then((response) => {
                                        if(response.data.resultCode === 0){
                                            props.unFollow(el.id)
                                        }
                                    });

                            }}> Unfollow </button>

                            : <button onClick={() => {
                                axios.post<{resultCode:number, messages:string[],data:any }>(`https://social-network.samuraijs.com/api/1.0/follow/${el.id}`,{},{withCredentials:true,headers:{'API-KEY':'aee1e098-c1ec-45af-b764-0edfc4a89fa8'}})
                                    .then((response) => {
                                        if(response.data.resultCode === 0){
                                            props.follow(el.id)
                                        }
                                    });
                            }}> Follow </button>
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
