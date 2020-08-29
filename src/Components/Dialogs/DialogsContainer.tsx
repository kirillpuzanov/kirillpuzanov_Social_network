import React from 'react';
import {sendMessageCreator, updateNewMessageBodyCreator} from '../../redux/message-reducer';
import {storeType} from "../../redux/redux-store";
import {Dialogs} from "./Dialogs";


type dialogsType = {
    // messagesData: Array<objMessageType>
    // dialogsData: Array<objDialogType>
    store: storeType
}

export function DialogsContainer(props: dialogsType) {

    let state = props.store.getState().messagesPage

    const onSendNewMessage = () => {
        props.store.dispatch(sendMessageCreator());
    }
    const onNewMessageChange = (body: string) => {
        props.store.dispatch(updateNewMessageBodyCreator(body));
    }

    return (
        <Dialogs
            updateNewMessageBody={onNewMessageChange}
            sendMessage={onSendNewMessage}
            messagesPage={state}
        />
    )
}