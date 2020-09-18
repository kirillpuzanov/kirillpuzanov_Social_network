import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css';
import {dialogsDataType, messagesDataType} from "../../redux/dialogs-reducer";
import {Dialog} from './Dialog/Dialog';
import {UserMessage} from "./UserMessage/UserMessage";


type dialogsType = {
    messagesData: Array<messagesDataType>
    dialogsData: Array<dialogsDataType>
    updateNewMessageBody: (e: ChangeEvent<HTMLTextAreaElement>) => void
    sendMessage: () => void
    newMessage: string
}

export function Dialogs(props: dialogsType) {

    const {dialogsData, messagesData, newMessage, sendMessage, updateNewMessageBody} = props
    return (
        <div className={s.dialogs_wrapper}>
            <div className={s.user_dialog}>
                {
                    dialogsData.map(dialog => <Dialog key={dialog.id} name={dialog.name} id={dialog.id}/>)
                }
            </div>
            <div className={s.user_message}>
                <div>
                    <textarea
                        placeholder='add text message'
                        onChange={updateNewMessageBody}
                        value={newMessage}
                    >
                    </textarea>
                </div>
                <div>
                    <button onClick={sendMessage}>Send</button>
                </div>
                <div>
                    {
                        messagesData.map(message => <UserMessage key={message.id} id={message.id} text={message.text}/>)
                    }
                </div>
            </div>
        </div>
    )
}