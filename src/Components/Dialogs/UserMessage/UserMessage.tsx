import React from "react";
import s from './UserMessage.module.css';

type UserMessagePropsType = {
    text: string
    id:string
}
export const UserMessage = (props: UserMessagePropsType) => {
    return (
        <div className={s.user_message_item}>
            {props.text}
        </div>
    )
}