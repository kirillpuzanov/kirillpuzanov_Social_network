import React from 'react';
import s from './MyPosts.module.css';
import {PostDataType} from "../../../redux/profile-reducer";
import {Post} from "./Post/Post";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {FieldRequired, maxLengthCreator} from "../../../utils/Validator";
import {Textarea} from "../../../common/FormsControls/FormsControls";


type MyPostsType = {
    postsData: Array<PostDataType>
    addPost: (newText: string) => void
}

export function MyPosts(props: MyPostsType) {

    const {addPost, postsData} = props
    const handleSubmit = (formData: NewPostFormDataType) => addPost(formData.newPost)

    return (
        <div className={s.myPosts}>
            <NewPostReduxForm onSubmit={handleSubmit}/>
            <div className={s.posts}>
                {
                    postsData.map(post => <Post key={post.id} likes={post.likes} message={post.message}/>)
                }
            </div>
        </div>
    )
}
const maxLength = maxLengthCreator(20)
type NewPostFormDataType = { newPost: string }
const NewPostForm: React.FC<InjectedFormProps<NewPostFormDataType>> = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <Field
                component={Textarea}
                name='newPost'
                placeholder='New post'
                validate={[FieldRequired,maxLength]}
            />
            <button> Send</button>
        </form>
    )
}
const NewPostReduxForm = reduxForm<NewPostFormDataType>({form: 'NewPostForm'})(NewPostForm)