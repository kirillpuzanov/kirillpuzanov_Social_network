import React, {KeyboardEvent, ChangeEvent} from 'react';
import s from './MyPosts.module.css';
import {Post} from "./Post/Post";
import {objPostType} from "../../../redux/store";


type MyPostsType = {
    postsData: Array<objPostType>
    newPostText: string
    changeTextareaHandler: (newPost: string) => void
    addPost: () => void
}


export function MyPosts(props: MyPostsType) {

    let postsElements = props.postsData.map(p => <Post key={Math.random()} message={p.message} likes={p.likes}/>)

    const addPostEnter = (e: KeyboardEvent<HTMLTextAreaElement>) => e.charCode === 13 && onAddPost();

    const onAddPost = () => props.addPost();

    const changeTextareaHandler = (e: ChangeEvent<HTMLTextAreaElement>) =>
        props.changeTextareaHandler(e.currentTarget.value)


    return (
        <div className={s.myPosts}>

            <div>
                <textarea onKeyPress={addPostEnter}
                          onChange={changeTextareaHandler}
                          value={props.newPostText}
                />
            </div>
            <div>
                <button onClick={onAddPost}>Add new post</button>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}

