import React from 'react';
import s from './NavBar.module.css';
import {NavLink} from "react-router-dom";
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
                    Messages
                </NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/users" activeClassName={s.activeLink}>
                    Users
                </NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/news" activeClassName={s.activeLink}>
                    News
                </NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/music" activeClassName={s.activeLink}>
                    Music
                </NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/sattings" activeClassName={s.activeLink}>
                    Sattings
                </NavLink>
            </div>
          {/*  <div className={s.item}>
                <NavLink to="/friends" activeClassName={s.activeLink}>
                    My Friends
                </NavLink>
            </div>*/}
        </nav>
    )
}