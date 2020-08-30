import React from 'react';
import {sendMessageCreator, updateNewMessageBodyCreator} from '../../redux/message-reducer';
import {storeType} from "../../redux/redux-store";
import {Dialogs} from "./Dialogs";
import {StoreContext} from "../../StoreContext";


type dialogsType = {
    // messagesData: Array<objMessageType>
    // dialogsData: Array<objDialogType>
    // store: storeType
}

export function DialogsContainer(props: dialogsType) {


    return (
        <StoreContext.Consumer>
            {
                (store) => {
                    let state = store.getState().messagesPage

                    const onSendNewMessage = () => {
                        store.dispatch(sendMessageCreator());
                    }
                    const onNewMessageChange = (body: string) => {
                        store.dispatch(updateNewMessageBodyCreator(body));
                    }
                    return <Dialogs
                        updateNewMessageBody={onNewMessageChange}
                        sendMessage={onSendNewMessage}
                        messagesPage={state}
                    />
                }
            }

        </StoreContext.Consumer>
    )
}