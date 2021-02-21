let subscribers = {
    'messages-received': [] as MessagesReceivedSubscriberType[],
    'status-changed': [] as StatusChangedSubscriberType[]
}

let ws: WebSocket | null = null;


const openHandler = () => {
    notifyAboutStatus('ready')
}

const closeHandler = () => {
    notifyAboutStatus('pending')
    setTimeout(createChanel, 3000)
}
const messageHandler = (e: MessageEvent) => {
    let newMessages = JSON.parse(e.data)
    subscribers['messages-received'].forEach(s => s(newMessages))
}
const errorHandler = () => {
    notifyAboutStatus('error')
}

const cleanUp = () => {
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('message', messageHandler)
    ws?.removeEventListener('open', openHandler)
    ws?.removeEventListener('error', errorHandler)
}
const notifyAboutStatus = (status: StatusChatType) => {
    subscribers['status-changed'].forEach(s => s(status))
}

function createChanel() {
    cleanUp()
    ws?.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    notifyAboutStatus('pending')
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)
    ws.addEventListener('open', openHandler)
    ws.addEventListener('error', errorHandler)
}


export const chatApi = {
    startChatChanel() {
        createChanel()
    },
    stopChatChanel() {
        subscribers['messages-received'] = []
        subscribers['status-changed'] = []
        cleanUp()
        ws?.close()
    },
    subscribe(eventName: EventsNameType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        // todo сделать универсальный тип
        // @ts-ignore
        subscribers[eventName].push(callback)
        return () => {
            // @ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(el => el !== callback)
        }
    },
    unsubscribe(eventName: EventsNameType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(el => el !== callback)
    },
    sendMessage(message: string) {
        ws?.send(message)
    }

}
type MessagesReceivedSubscriberType = (messages: ChatMessageType[]) => void
type StatusChangedSubscriberType = (status: StatusChatType) => void
export type StatusChatType = 'pending' | 'ready' | 'error'
type EventsNameType = 'messages-received' | 'status-changed'
export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
    id?: string
}
