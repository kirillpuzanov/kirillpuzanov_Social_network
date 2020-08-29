import React from 'react';
import s from './Dialog.module.css';
import {NavLink} from "react-router-dom";


type dialogPropsType ={
    name:string
    id:string
}

export const Dialog = (props:dialogPropsType) => {
    return (
        <div className={s.user_dialog_item + ' ' + s.activeLink}>
            <NavLink to={'/dialog/' + props.id} >{props.name} </NavLink>
        </div>
    )
}