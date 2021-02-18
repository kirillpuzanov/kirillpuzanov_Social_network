import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";


type HeaderType = {
    login: null | string
    isFetching: null | boolean
    isAuth: boolean
    logout: () => void
}


export function Header(props: HeaderType) {
    return (
        <header className={s.header}>
            <a href='/profile'><img alt='logo'
                             src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Logo_TV_2015.svg/1200px-Logo_TV_2015.svg.png"/>
            </a>
            <div className={s.header_loginBlock}>
                {
                    (props.isAuth)
                        ? <div>
                            <div>{props.login}</div>
                            <button onClick={props.logout}> Logout</button>
                        </div>
                        : <NavLink to={'/login'}>
                            Login
                        </NavLink>
                }
            </div>
        </header>
    )
}