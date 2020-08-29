import React from 'react';
import c from './ProFile.module.css';
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {storeType} from "../../redux/redux-store";


type ProfilePropsType = {
  /*  postsData: Array<objPostType>
    newPostText: string
    dispatch: (action: ActionsTypes) => void*/
    store:storeType
}

export function Profile(props: ProfilePropsType) {

    return (
        <div className={c.profile}>
            <ProfileInfo/>
            <MyPostsContainer
                store={props.store}
            />
        </div>
    )
}
