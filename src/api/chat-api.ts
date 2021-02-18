let subscribers = [] as SubscriberType[]

let ws: WebSocket | null = null;
const closeHandler = () => {
    console.log('close WS')
    setTimeout(createChanel, 3000)
}
let messageHandler = (e: MessageEvent) => {
    //todo сделать правильные id для мапа
   // let newMessages = JSON.parse(e.data).map((el: SubscriberType) => ({...el, id: v1()}))
    let newMessages = JSON.parse(e.data)
    subscribers.forEach(s => s(newMessages))
}

function createChanel() {
    ws?.removeEventListener('close', closeHandler)
    ws?.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)
}


export const chatApi = {
    startChatChanel(){
        createChanel()
    },
    stopChatChanel(){
        subscribers = []
        ws?.removeEventListener('close', closeHandler)
        ws?.removeEventListener('message', messageHandler)
        ws?.close()
    },
    subscribe(callback: SubscriberType) {
        subscribers.push(callback)
        return () => {
            subscribers = subscribers.filter(el => el !== callback)
        }
    },
    unsubscribe(callback: SubscriberType) {
        subscribers = subscribers.filter(el => el !== callback)
    },
    sendMessage(message: string) {
        ws?.send(message)
    }

}
type SubscriberType = (messages: ChatMessageType[]) => void
export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
    id?: string
}