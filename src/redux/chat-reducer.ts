import {chatApi, ChatMessageType, StatusChatType} from '../api/chat-api';
import {BaseThunkType, InferActionsTypes} from './redux-store';
import {Dispatch} from 'redux';
import {v1} from 'uuid';


let initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusChatType
}


export const chatReducer = (state = initialState, action: ChatActionType) => {

    switch (action.type) {
        case 'CHAT/SET-MESSAGES':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages.map(m => ({...m, id: v1()}))]
                    .filter((m, index, array) => index >= array.length - 100)
            }
        case 'CHAT/STATUS-CHANGED':
            return {
                ...state, status: action.payload.status
            }
        case 'CHAT/CLEAN-MESSAGES':
            return {
                ...state, messages: []
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
let _newStatusHandler: ((status: StatusChatType) => void) | null = null
const newStatusHandlerCreator = (dispatch: Dispatch) => {
    if (_newStatusHandler === null) {
        _newStatusHandler = (status) => {
            dispatch(chatActions.changeStatus(status))
        }
    }
    return _newStatusHandler
}

export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatApi.startChatChanel()
    chatApi.subscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatApi.subscribe('status-changed', newStatusHandlerCreator(dispatch))
}
export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatApi.unsubscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatApi.unsubscribe('status-changed', newStatusHandlerCreator(dispatch))
    dispatch(chatActions.cleanMessage())
    chatApi.stopChatChanel()

}
export const sendMessage = (message: string): ThunkType => async () => {
    chatApi.sendMessage(message)
}
//Actions
export const chatActions = {
    setMessages: (messages: ChatMessageType[]) => ({
        type: 'CHAT/SET-MESSAGES', payload: {messages}
    } as const),
    changeStatus: (status: StatusChatType) => ({
        type: 'CHAT/STATUS-CHANGED', payload: {status}
    } as const),
    cleanMessage: () => ({
        type: 'CHAT/CLEAN-MESSAGES'
    } as const),
}

type ThunkType = BaseThunkType<ChatActionType>
type ChatActionType = InferActionsTypes<typeof chatActions>
export type initialStateType = typeof initialState
