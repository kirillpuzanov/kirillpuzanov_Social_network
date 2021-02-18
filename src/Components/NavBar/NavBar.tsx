import React from 'react';
import s from './NavBar.module.css';
import {NavLink} from 'react-router-dom';

export function NavBar() {
    return (
        <nav className= {s.nav}>
            <div className={s.item}>
                <NavLink to="/profile" activeClassName={s.activeLink}>
                    Profile
                </NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/dialogs" activeClassName={s.activeLink}>
                    Dialogs
                </NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/users" activeClassName={s.activeLink}>
                    Users
                </NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/chat' activeClassName={s.activeLink}>
                    DevChat
                </NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/music" activeClassName={s.activeLink}>
                    Music
                </NavLink>
            </div>
        </nav>
    )
}