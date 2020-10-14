import React from 'react';
import {getUserProfileTC, UserProfileType} from "../../redux/profile-reducer";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {Redirect, RouteComponentProps, withRouter} from 'react-router-dom';

type ProfileContainerType = MapStateToPropsType & MapDispatchToPropsType;
// PathParamsType типы ожидаемых параметров & ProfileContainerType тип нашей контейнерной компоненты
type ProfileContainerTypeWithRouter = RouteComponentProps<PathParamsType> & ProfileContainerType

class ProfileContainer extends React.Component<ProfileContainerTypeWithRouter, UserProfileType> {

    componentDidMount() {
        // componentDidMount - метод жизненного цикла контейнерной компоненты,  вызывается сразу после монтирования (то есть, вставки компонента в DOM).Это хорошее место для создания  запросов и т.д.
        let userId = this.props.match.params.userId;
        if(!userId)  userId = '2';
        this.props.getUserProfile(userId)
    }

    render() {
        if (!this.props.isAuth) return <Redirect to={'/login'}/>
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
    isAuth: boolean
};
type MapDispatchToPropsType = {
    getUserProfile: (userId: string) => void
};

let MapStateToProps = (state: AppStateType):MapStateToPropsType => {
    return{
        userProfile: state.profilePage.userProfile,
        isAuth: state.auth.isAuth,
    }
}

let WithUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(MapStateToProps, {
    getUserProfile: getUserProfileTC
})(WithUrlDataContainerComponent);


//ProfileInfo => Profile => ProfileContainer (my comp.) => WithUrlDataContainerComponent(comp. withRouter ) => WithUrlDataContainerComponent'Container2' ( with connect )