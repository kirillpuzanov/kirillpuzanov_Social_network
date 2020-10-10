import React from 'react';
import c from './ProFile.module.css';
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {UserProfileType} from "../../redux/profile-reducer";

type ProfilePropsType ={
    userProfile: UserProfileType | null
}

export function Profile(props:ProfilePropsType) {
    return (
        <div className={c.profile}>
            <ProfileInfo userProfile={props.userProfile}/>
            <MyPostsContainer/>
        </div>
    )
}
