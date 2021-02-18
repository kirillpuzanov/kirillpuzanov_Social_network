import React, {useEffect, useState} from 'react';
import {ChatMessageType} from '../../api/chat-api';
import {useDispatch, useSelector} from 'react-redux';
import {sendMessage, startMessagesListening, stopMessagesListening} from '../../redux/chat-reducer';
import {AppStateType} from '../../redux/redux-store';

export const ChatPage = () => {
    return (
        <div>
            <Chat/>
        </div>
    )
}

const Chat: React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [dispatch])

    const style = {
        margin: ' 100px auto',
        width: '50%',
        border: '1px solid black'
    } as React.CSSProperties
    return (
        <div style={style}>
            <Messages/>
            <AddMessageForm/>
        </div>
    )
}

const Messages: React.FC = () => {

    const messages = useSelector<AppStateType, ChatMessageType[]>(s => s.chat.messages)

    const style = {
        height: '400px',
        overflowY: 'auto',
        marginBottom: '30px'
    } as React.CSSProperties

    return <div style={style}>
        {
            messages.map((el) => <div key={el.id}>
                <Message message={el}/>
                <hr/>
            </div>)
        }
    </div>
}

const Message: React.FC<{ message: ChatMessageType }> = (props) => {
    const {photo, userName, message} = props.message
    const styleWrap = {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    } as React.CSSProperties

    return <div style={styleWrap}>
        <img style={{width: '40px', height: '40px'}} src={photo} alt="user avatar"/>
        <div style={{flexBasis: '80%'}}>
            <p>{userName} </p>
            <span style={{textAlign: 'left'}}>{message}</span>
        </div>
    </div>
}

const AddMessageForm = () => {
    const [myMessage, setMyMessage] = useState<string>('')
    const dispatch = useDispatch();
    const sendMessageHandler = () => {
        if (!myMessage) return
        dispatch(sendMessage(myMessage))
        setMyMessage('')
    }

    return <div>
        <textarea onChange={(e) => setMyMessage(e.currentTarget.value)} value={myMessage}></textarea>
        <div>
            <button  onClick={sendMessageHandler}> Отправить</button>
        </div>
    </div>
}




