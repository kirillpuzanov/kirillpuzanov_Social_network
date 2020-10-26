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
};


export const dialogsReducer = (state = initialState, action: ActionsTypes): initialStateType => {
    switch (action.type) {
        case 'SEND_MESSAGE': {
            return {...state, messagesData: [{id: v1(), text: action.newMessage}, ...state.messagesData]}
        }
        default:
            return state
    }
}

export const dialogsActions = {
    sendMessageAC: (newMessage: string) => ({
        type: 'SEND_MESSAGE', newMessage
    } as const),
}
