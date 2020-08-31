import React, {ChangeEvent} from 'react';
import {PostDataType, profileActions} from "../../../redux/profile-reducer";
import {MyPosts} from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";




type Maintype = {}

type MapStateToPropsType = {
    postsData: Array<PostDataType>
    newPostText: string
}
type MapDispatchToPropsType = {
    PostActionCreator: (newPostText: string) => void,
    TextAreaActionCreator: (newText: string) => void
}
type MyPostContainerType = Maintype & MapStateToPropsType & MapDispatchToPropsType

const MyPostContainer = (props: MyPostContainerType) => {
    const {newPostText, postsData, PostActionCreator, TextAreaActionCreator} = props

    const onChangeTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
        TextAreaActionCreator(e.currentTarget.value)
    }

    const addPost = () => {
        PostActionCreator(newPostText)
    }

    return <MyPosts
        postsData={postsData}
        newPostText={newPostText}
        addPost={addPost}
        onChangeTextArea={onChangeTextArea}

    />
}
const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        postsData: state.profilePage.postsData,
        newPostText: state.profilePage.newPostText
    }
}
export default connect<MapStateToPropsType, MapDispatchToPropsType, Maintype, AppStateType>(mapStateToProps,
    {
        PostActionCreator: profileActions.addPostActionCreator,
        TextAreaActionCreator: profileActions.changeTextAreaActionCreator
    })
(MyPostContainer);

