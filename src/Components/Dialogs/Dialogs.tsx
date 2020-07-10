import React from 'react';
import s from './Dialogs.module.css';
import {Dialog} from "./Dialog/Dialog";
import {UserMessage} from "./UserMessage/UserMessage";
import { dialogsDataPropsType, messageDataPropsType} from '../..';



type DialogsType = {
    messageData: messageDataPropsType
    dialogsData: dialogsDataPropsType
}

export function Dialogs(props:DialogsType) {

    let messagesElements = props.messageData.map(m => <UserMessage key={m.id} text={m.text} id={m.id}/>);

    let dialogsElements = props.dialogsData
        .map(d => <Dialog key={d.id} name={d.name} id={d.id}/>);
    return (
        <div className={s.dialogs_wrapper}>
            <div className={s.user_dialog}>
                {dialogsElements}
            </div>
            <div className={s.user_message}>
                {messagesElements}
            </div>
        </div>
    )
}