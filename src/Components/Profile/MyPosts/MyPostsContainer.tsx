import React from 'react';
import {addPostActionCreator, changeTextAreaActionCreator} from "../../../redux/profile-reducer";
import {MyPosts} from "./MyPosts";
import {storeType} from "../../../redux/redux-store";
import {StoreContext} from "../../../StoreContext";


type MyPostsContainerType = {
    /*postsData: Array<objPostType>
    newPostText: string
    dispatch: (action: ActionsTypes) => void*/
    // store: storeType
}


export function MyPostsContainer(props: MyPostsContainerType) {


    return (
        <StoreContext.Consumer>
            {
                (store) => {
                    const state = store.getState();
                    const addPost = () => store.dispatch(addPostActionCreator(state.profilePage.newPostText));

                    const changeTextareaHandler = (text: string) =>
                        store.dispatch(changeTextAreaActionCreator(text))
                    return <MyPosts
                        postsData={state.profilePage.postsData}
                        newPostText={state.profilePage.newPostText}
                        changeTextareaHandler={changeTextareaHandler}
                        addPost={addPost}
                    />
                }
            }
        </StoreContext.Consumer>
    )
}

