import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css';
import {dialogsDataType, messagesDataType} from "../../redux/message-reducer";
import {Dialog} from './Dialog/Dialog';
import {UserMessage} from "./UserMessage/UserMessage";


/*type dialogsType = {
    // messagesData: Array<objMessageType>
    // dialogsData: Array<objDialogType>
    updateNewMessageBody: (body: string) => void
    sendMessage: () => void

}*/
type dialogsType = {
    messagesData: Array<messagesDataType>
    dialogsData: Array<dialogsDataType>
    updateNewMessageBody: (e: ChangeEvent<HTMLTextAreaElement>) => void
    sendMessage: () => void
    newMessage: string
}

export function Dialogs(props: dialogsType) {

    const {dialogsData, messagesData, newMessage, sendMessage, updateNewMessageBody} = props
    /*
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
    */

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