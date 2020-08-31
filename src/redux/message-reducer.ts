import {v1} from "uuid";
import {InferActionsTypes} from "./redux-store";

type ActionsTypes = InferActionsTypes<typeof dialogsActions>
export type messagesDataType = {
    id: string
    text: string
}
export type dialogsDataType = {
    id: string
    name: string
}

type initialStateType = typeof initialState;

let initialState = {
    messagesData: [
        {id: v1(), text: 'hi'},
        {id: v1(), text: 'hello'},
        {id: v1(), text: 'goodbye!'}
    ] as Array<messagesDataType>,
    dialogsData: [
        {id: v1(), name: 'Sasha'},
        {id: v1(), name: 'Masha'},
        {id: v1(), name: 'Dasha'},
        {id: v1(), name: 'Kirill'},
        {id: v1(), name: 'Stas'}
    ] as Array<dialogsDataType>,
    newMessage: ''
};


export const messagesReducer = (state = initialState, action: ActionsTypes): initialStateType => {
    switch (action.type) {
        case 'SEND_MESSAGE':{
            let Message = {id:v1(), text:action.sendMessage}
            return {...state, messagesData:[Message, ...state.messagesData]}
        }
        case 'UPDATE_NEW_MESSAGE_BODY':{
            return {...state, newMessage: action.newMessageBody}
        }
        default:
            return state
    }
}


export const dialogsActions = {
    sendMessageCreator: (text: string) => ({
        type: 'SEND_MESSAGE', sendMessage: text
    } as const),
    NewMessageCreator: (text: string) => ({
        type: 'UPDATE_NEW_MESSAGE_BODY', newMessageBody:text
    } as const)
}


//
// export const messagesReducer = (state: MessagesPageType = initialState, action: ActionsTypes) => {
//     switch (action.type) {
//         case UPDATE_NEW_MESSAGE_BODY:
//             state.newMessageBody = action.body;
//             return state;
//         case SEND_MESSAGE:
//             let body = state.newMessageBody;
//             state.newMessageBody = '';
//             state.messagesData.push({id: v1(), text: body})
//             return state;
//         default:
//             return state;
//     }
// }
//
// export const sendMessageCreator = (): SendMessageType => {
//     return {type: SEND_MESSAGE}
// }
// export const updateNewMessageBodyCreator = (body: string): NewMessageBodyType => {
//     return {type: UPDATE_NEW_MESSAGE_BODY, body: body}
// }