import React from 'react';
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {dialogsActions, dialogsDataType, messagesDataType} from "../../redux/dialogs-reducer";
import {compose} from "redux";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";


type DialogsContainerType = MainType & MapStateToPropsType & MapDispatchToPropsType

type MainType = {}

type MapStateToPropsType = {
    messagesData: Array<messagesDataType>
    dialogsData: Array<dialogsDataType>
}
type MapDispatchToPropsType = {
    sendMessageAC: (text: string) => void

}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        messagesData: state.messagesPage.messagesData,
        dialogsData: state.messagesPage.dialogsData,
    }
}


export function DialogsContainer(props: DialogsContainerType) {

    const sendMessage = (newTextBody:string) => {
        props.sendMessageAC(newTextBody)
    }
    return (
        <Dialogs
            sendMessage={sendMessage}
            dialogsData={props.dialogsData}
            messagesData={props.messagesData}
        />
    )
}
export default compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType, MainType, AppStateType>(mapStateToProps, {
        sendMessageAC: dialogsActions.sendMessageAC
    }),
    WithAuthRedirect
)(DialogsContainer)

