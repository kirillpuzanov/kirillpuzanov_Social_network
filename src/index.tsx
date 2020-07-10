import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


export type postsDataPropsType = Array<objPostsDataType>
export type dialogsDataPropsType = Array<objDialogsDataPropsType>
export type messageDataPropsType = Array<objMessageDataPropsType>

export type AppPropsType = {
    dialogsData: dialogsDataPropsType
    messageData: messageDataPropsType
    postsData: postsDataPropsType
}

type objPostsDataType = {
    id: number
    message: string
    likes: number
}
type  objDialogsDataPropsType = {
    id: number
    name: string
}
type objMessageDataPropsType = {
    id: number
    text: string
}

export let postsData = [
    {id: 1, message: 'Hi, how are you?', likes: 7},
    {id: 1, message: 'Hi, how are you?', likes: 7},
    {id: 2, message: 'Hallo, i am fine!', likes: 10}
]

export let dialogsData = [
    {id: 1, name: 'Sasha'},
    {id: 2, name: 'Masha'},
    {id: 3, name: 'Dasha'},
    {id: 4, name: 'Kirill'},
    {id: 5, name: 'Stas'}
]
export let messageData = [
    {id: 1, text: 'hi'},
    {id: 2, text: 'hello'},
    {id: 3, text: 'goodbye!'}

]


ReactDOM.render(<App postsData={postsData} dialogsData={dialogsData}
                     messageData={messageData}/>, document.getElementById('root')
)


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

