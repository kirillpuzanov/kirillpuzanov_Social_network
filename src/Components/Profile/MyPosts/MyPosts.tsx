import React from 'react';
import s from './MyPosts.module.css';
import {PostDataType} from "../../../redux/profile-reducer";
import {Post} from "./Post/Post";
import TextAreaReduxForm, {TextareaFormDataType} from "../../../common/textareaReduxForm/TextareaReduxForm";

type MyPostsType = {
    postsData: Array<PostDataType>
    addPost: (newText:string) => void
}

export function MyPosts(props: MyPostsType) {

    const {addPost, postsData} = props
    const handleSubmit = (formData: TextareaFormDataType)=> addPost(formData.newText)

    return (
        <div className={s.myPosts}>
            <TextAreaReduxForm onSubmit={handleSubmit}/>
            <div className={s.posts}>
                {
                    postsData.map(post => <Post key={post.id} likes={post.likes} message={post.message}/>)
                }
            </div>
        </div>
    )
}

