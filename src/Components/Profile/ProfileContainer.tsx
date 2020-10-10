import React from 'react';
import {profileActions, UserProfileType} from "../../redux/profile-reducer";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {profileAPI} from "../../api/api";

type ProfileContainerType = MapStateToPropsType & MapDispatchToPropsType;
// PathParamsType типы ожидаемых параметров & ProfileContainerType тип нашей контейнерной компоненты
type ProfileContainerTypeWithRouter = RouteComponentProps<PathParamsType> & ProfileContainerType

class ProfileContainer extends React.Component<ProfileContainerTypeWithRouter, UserProfileType> {

    componentDidMount() {
        // componentDidMount - метод жизненного цикла контейнерной компоненты,  вызывается сразу после монтирования (то есть, вставки компонента в DOM).Это хорошее место для создания  запросов и т.д.
        let userId = this.props.match.params.userId;
        if(!userId)  userId = '2';
        profileAPI.getUser(userId).then((response) => {
                this.props.setUserProfile(response.data)
            });
    }

    render() {
        return (
            <div>
                <Profile {...this.props}  userProfile={this.props.userProfile}/>
            </div>
        )
    }
}
type PathParamsType = {
    userId: string
}
type MapStateToPropsType = {
    userProfile:UserProfileType | null
};
type MapDispatchToPropsType = {
    setUserProfile: (userProfile: UserProfileType) => void
};

let MapStateToProps = (state: AppStateType):MapStateToPropsType => {
    return{
        userProfile: state.profilePage.userProfile,
    }
}

let WithUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(MapStateToProps, {
    setUserProfile: profileActions.setUserProfileAC,
})(WithUrlDataContainerComponent);


//ProfileInfo => Profile => ProfileContainer (my comp.) => WithUrlDataContainerComponent(comp. withRouter ) => WithUrlDataContainerComponent'Container2' ( with connect )