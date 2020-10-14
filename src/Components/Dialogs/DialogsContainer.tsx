import React, {ChangeEvent} from 'react';
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {dialogsActions, dialogsDataType, messagesDataType} from "../../redux/dialogs-reducer";
import {Redirect} from "react-router-dom";


type DialogsContainerType = MainType & MapStateToPropsType & MapDispatchToPropsType

type MainType = {}

type MapStateToPropsType = {
    messagesData: Array<messagesDataType>
    newMessage: string
    dialogsData: Array<dialogsDataType>
    isAuth:boolean

}
type MapDispatchToPropsType = {
    sendMessageCreator: (text: string) => void
    NewMessageCreator: (text: string) => void
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        messagesData: state.messagesPage.messagesData,
        newMessage: state.messagesPage.newMessage,
        dialogsData: state.messagesPage.dialogsData,
        isAuth: state.auth.isAuth,
    }
}


export function DialogsContainer(props: DialogsContainerType) {

    const updateNewMessageBody = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.NewMessageCreator(e.currentTarget.value)
    }
    const sendMessage = () => {
        props.sendMessageCreator(props.newMessage)
    }
    if (!props.isAuth) return <Redirect to={'/login'}/>
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

export default connect<MapStateToPropsType, MapDispatchToPropsType, MainType, AppStateType>(mapStateToProps, {
    NewMessageCreator: dialogsActions.NewMessageCreator,
    sendMessageCreator: dialogsActions.sendMessageCreator
})(DialogsContainer);