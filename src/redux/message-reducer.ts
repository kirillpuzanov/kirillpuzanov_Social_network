import {v1} from "uuid";
import {
    ActionsTypes,
    NewMessageBodyType,
    objDialogType,
    objMessageType,
    SendMessageType
} from "./store";


const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY'
const SEND_MESSAGE = 'SEND_MESSAGE'

type MessagesPageType = {
    messagesData: Array<objMessageType>
    dialogsData: Array<objDialogType>
    newMessageBody: string
}

let initialState = {
    messagesData: [
        {id: v1(), text: 'hi'},
        {id: v1(), text: 'hello'},
        {id: v1(), text: 'goodbye!'}
    ],
    dialogsData: [
        {id: v1(), name: 'Sasha'},
        {id: v1(), name: 'Masha'},
        {id: v1(), name: 'Dasha'},
        {id: v1(), name: 'Kirill'},
        {id: v1(), name: 'Stas'}
    ],
    newMessageBody: ''
};

export const messagesReducer = (state: MessagesPageType = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            state.newMessageBody = action.body;
            return state;
        case SEND_MESSAGE:
            let body = state.newMessageBody;
            state.newMessageBody = '';
            state.messagesData.push({id: v1(), text: body})
            return state;
        default:
            return state;
    }
}

export const sendMessageCreator = (): SendMessageType => {
    return {type: SEND_MESSAGE}
}
export const updateNewMessageBodyCreator = (body: string): NewMessageBodyType => {
    return {type: UPDATE_NEW_MESSAGE_BODY, body: body}
}
