import React from 'react';
import c from './Post.module.css';
type propsType = {
    message:string
    likes: number
}
export function Post(props: propsType) {
    return (
        <div>
            <div className={c.item}>
                <img src="https://upload.wikimedia.org/wikipedia/ru/9/9f/Safari-icon.png" alt="icon"/>
                {props.message}
            </div>
            {props.likes} like
        </div>
    )
}