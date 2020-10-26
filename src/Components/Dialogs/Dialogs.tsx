import React from 'react';
import s from './Dialogs.module.css';
import {dialogsDataType, messagesDataType} from "../../redux/dialogs-reducer";
import {Dialog} from './Dialog/Dialog';
import {UserMessage} from "./UserMessage/UserMessage";
import TextAreaReduxForm, {TextareaFormDataType} from "../../common/textareaReduxForm/TextareaReduxForm";


type dialogsType = {
    messagesData: Array<messagesDataType>
    dialogsData: Array<dialogsDataType>
    sendMessage: (newTextBody:string) => void
}

export function Dialogs(props: dialogsType) {

    const {dialogsData, messagesData,  sendMessage} = props

    const handleSubmit = (formData:TextareaFormDataType)=> {
        sendMessage(formData.newText)
    }
    return (
        <div className={s.dialogs_wrapper}>
            <div className={s.user_dialog}>
                {
                    dialogsData.map(dialog => <Dialog key={dialog.id} name={dialog.name} id={dialog.id}/>)
                }
            </div>
            <div className={s.user_message}>
                <TextAreaReduxForm onSubmit={handleSubmit}/>
                <div>
                    {
                        messagesData.map(message => <UserMessage key={message.id} id={message.id} text={message.text}/>)
                    }
                </div>
            </div>
        </div>
    )
}

