import React, {ChangeEvent} from 'react';
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {dialogsActions, dialogsDataType, messagesDataType} from "../../redux/dialogs-reducer";


type DialogsContainerType = Maintype & MapStateToPropsType & MapDispatchToPropsType

type Maintype = {}

type MapStateToPropsType = {
    messagesData: Array<messagesDataType>
    newMessage: string
    dialogsData: Array<dialogsDataType>

}
type MapDispatchToPropsType = {
    sendMessageCreator: (text: string) => void
    NewMessageCreator: (text: string) => void
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        messagesData: state.messagesPage.messagesData,
        newMessage: state.messagesPage.newMessage,
        dialogsData: state.messagesPage.dialogsData
    }
}


export function DialogsContainer(props: DialogsContainerType) {

    const updateNewMessageBody = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.NewMessageCreator(e.currentTarget.value)
    }
    const sendMessage = () => {
        props.sendMessageCreator(props.newMessage)
    }
    return (
        <Dialogs
            sendMessage={sendMessage}
            updateNewMessageBody={updateNewMessageBody}
            dialogsData={props.dialogsData}
            messagesData={props.messagesData}
            newMessage={props.newMessage}
        />
    )
}

export default connect<MapStateToPropsType, MapDispatchToPropsType, Maintype, AppStateType>(mapStateToProps, {
    NewMessageCreator: dialogsActions.NewMessageCreator,
    sendMessageCreator: dialogsActions.sendMessageCreator
})(DialogsContainer);