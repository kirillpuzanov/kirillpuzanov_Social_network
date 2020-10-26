import React from 'react';
import {PostDataType, profileActions} from "../../../redux/profile-reducer";
import {MyPosts} from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";

type Maintype = {}

type MapStateToPropsType = {
    postsData: Array<PostDataType>
}
type MapDispatchToPropsType = {
    PostActionCreator: (newPostText: string) => void,
}
type MyPostContainerType = Maintype & MapStateToPropsType & MapDispatchToPropsType




const MyPostContainer = (props: MyPostContainerType) => {
    const {postsData, PostActionCreator} = props

    const addPost = (newText:string) => {
        PostActionCreator(newText)
    }

    return <MyPosts
        postsData={postsData}
        addPost={addPost}

    />
}
const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        postsData: state.profilePage.postsData,
    }
}
export default connect<MapStateToPropsType, MapDispatchToPropsType, Maintype, AppStateType>(mapStateToProps,
    {
        PostActionCreator: profileActions.addPostActionCreator,
    })
(MyPostContainer);

