import React from 'react';
import c from './ProFile.module.css';
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {UserProfileType} from "../../redux/profile-reducer";

type ProfilePropsType ={
    userProfile: UserProfileType | null
    status:string
    updateStatus:(status: string) => void
}

export function Profile(props:ProfilePropsType) {
    return (
        <div className={c.profile}>
            <ProfileInfo
                userProfile={props.userProfile}
                updateStatus={props.updateStatus}
                status={props.status}
            />
            <MyPostsContainer/>
        </div>
    )
}
