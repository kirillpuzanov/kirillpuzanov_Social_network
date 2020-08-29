import React, {ChangeEvent, KeyboardEvent} from 'react';
import s from './Dialogs.module.css';
import {Dialog} from "./Dialog/Dialog";
import {UserMessage} from "./UserMessage/UserMessage";
import {MessagesPageType} from "../../redux/store";


type dialogsType = {
    // messagesData: Array<objMessageType>
    // dialogsData: Array<objDialogType>
    updateNewMessageBody: (body: string) => void
    sendMessage: () => void
    messagesPage: MessagesPageType
}

export function Dialogs(props: dialogsType) {
    let state = props.messagesPage;

    let messagesElements = state.messagesData.map(m => <UserMessage key={m.id} text={m.text} id={m.id}/>);

    let dialogsElements = state.dialogsData.map(d => <Dialog key={d.id} name={d.name} id={d.id}/>);
    let newMessageBody = state.newMessageBody;

    const addMessageEnter = (e: KeyboardEvent<HTMLTextAreaElement>) => e.charCode === 13 && onSendNewMessage();


    const onSendNewMessage = () => {
        props.sendMessage();
    }
    const onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let body = e.currentTarget.value;
        props.updateNewMessageBody(body);
    }

    return (
        <div className={s.dialogs_wrapper}>
            <div className={s.user_dialog}>
                {dialogsElements}
            </div>
            <div className={s.user_message}>
                {messagesElements}
                <div>
                    <textarea
                        placeholder='add text message'
                        onKeyPress={addMessageEnter}
                        value={newMessageBody}
                        onChange={onNewMessageChange}>

                    </textarea>
                </div>
                <div>
                    <button onClick={onSendNewMessage}>Send</button>
                </div>
            </div>
        </div>
    )
}