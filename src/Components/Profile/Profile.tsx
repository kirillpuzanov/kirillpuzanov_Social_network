import React from 'react';
import c from './ProFile.module.css';
import {MyPosts} from "./MyPosts/MyPosts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {postsDataPropsType} from "../../index";

export type ProfilePropsType = {
    postsData: postsDataPropsType
}

export function Profile(props: ProfilePropsType) {

    return (
        <div className={c.profile}>
            <ProfileInfo/>
            <MyPosts postsData={props.postsData} />

        </div>
    )
}
