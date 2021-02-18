import {chatApi, ChatMessageType} from '../api/chat-api';
import {BaseThunkType, InferActionsTypes} from './redux-store';
import {Dispatch} from 'redux';


let initialState = {
    messages: [] as ChatMessageType[]
}


export const chatReducer = (state = initialState, action: ChatActionType) => {

    switch (action.type) {
        case 'CHAT/SET-MESSAGES':
            return {
                //todo сделать правильные id для мапа
                ...state,
                messages: [...state.messages, ...action.payload]
            }

        default:
            return state;
    }
}

//thunk's
let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(chatActions.setMessages(messages))
        }
    }
    return _newMessageHandler
}

export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatApi.startChatChanel()
    chatApi.subscribe(newMessageHandlerCreator(dispatch))
}
export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatApi.unsubscribe(newMessageHandlerCreator(dispatch))
    chatApi.stopChatChanel()

}
export const sendMessage = (message: string): ThunkType => async () => {
    chatApi.sendMessage(message)
}
//Actions
export const chatActions = {
    setMessages: (messages: ChatMessageType[]) => ({
        type: 'CHAT/SET-MESSAGES', payload: messages
    }) as const,

}

type ThunkType = BaseThunkType<ChatActionType>
type ChatActionType = InferActionsTypes<typeof chatActions>
export type initialStateType = typeof initialState