import React from 'react';
import { addPostActionCreator, changeTextAreaActionCreator} from "../../../redux/profile-reducer";
import {MyPosts} from "./MyPosts";
import {storeType} from "../../../redux/redux-store";


type MyPostsContainerType = {
    /*postsData: Array<objPostType>
    newPostText: string
    dispatch: (action: ActionsTypes) => void*/
    store: storeType
}


export function MyPostsContainer(props: MyPostsContainerType) {

    const state = props.store.getState();

    const addPost = () => props.store.dispatch(addPostActionCreator(state.profilePage.newPostText));

    const changeTextareaHandler = (text:string) =>
        props.store.dispatch(changeTextAreaActionCreator(text))

    return (
       <MyPosts
           postsData={state.profilePage.postsData}
           newPostText={state.profilePage.newPostText}
           changeTextareaHandler={changeTextareaHandler}
           addPost={addPost}
       />
    )
}

