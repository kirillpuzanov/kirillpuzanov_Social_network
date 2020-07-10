import React from 'react';
import s from './MyPosts.module.css';
import {Post} from "./Post/Post";
import {postsDataPropsType} from "../../../index";

type MyPostsType = {
    postsData: postsDataPropsType
}


export function MyPosts(props: MyPostsType) {

    let postsElements = props.postsData.map(p => <Post key={Math.random()} message={p.message} likes={p.likes}/>
        )
    return (
        <div className={s.myPosts}>

            <div>
                <textarea></textarea>
            </div>
            <div>
                <button>Add new post</button>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}