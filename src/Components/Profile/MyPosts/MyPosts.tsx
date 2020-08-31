import React, {ChangeEvent} from 'react';
import s from './MyPosts.module.css';
import {PostDataType} from "../../../redux/profile-reducer";
import {Post} from "./Post/Post";

type MyPostsType = {
    postsData: Array<PostDataType>
    newPostText: string
    onChangeTextArea: (e: ChangeEvent<HTMLTextAreaElement>) => void
    addPost: () => void
}

export function MyPosts(props: MyPostsType) {

    const {addPost, onChangeTextArea, newPostText, postsData} = props
    return (
        <div className={s.myPosts}>

            <div>
                <textarea value={newPostText}
                          onChange={onChangeTextArea}
                />
            </div>
            <div>
                <button
                    onClick={addPost}
                >Add new post
                </button>
            </div>
            <div className={s.posts}>
                {
                    postsData.map(post => <Post key={post.id}likes={post.likes} message={post.message}/>)
                }
            </div>
        </div>
    )
}

