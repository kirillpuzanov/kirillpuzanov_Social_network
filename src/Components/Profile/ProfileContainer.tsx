import React from 'react';
import {getStatusTC, getUserProfileTC, updateStatusTC, UserProfileType} from "../../redux/profile-reducer";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {compose} from "redux";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";

type ProfileContainerType = MapStateToPropsType & MapDispatchToPropsType;
// PathParamsType типы ожидаемых параметров & ProfileContainerType тип нашей контейнерной компоненты
type ProfileContainerTypeWithRouter = RouteComponentProps<PathParamsType> & ProfileContainerType

class ProfileContainer extends React.Component<ProfileContainerTypeWithRouter> {

    componentDidMount() {
        // componentDidMount - метод жизненного цикла контейнерной компоненты,  вызывается сразу после монтирования (то есть, вставки компонента в DOM).Это хорошее место для создания  запросов и т.д.
        let userId: null | number = +this.props.match.params.userId;
        if (!userId) userId = this.props.authorizedUserId;
        this.props.getUserProfile(userId);
        this.props.getStatus(userId);
    }

    render() {
        return (
            <div>
                <Profile {...this.props}
                         userProfile={this.props.userProfile}
                         status={this.props.status}
                         updateStatus={this.props.updateStatus}
                />
            </div>
        )
    }
}

type PathParamsType = {
    userId: string
}
type MapStateToPropsType = {
    userProfile: UserProfileType | null
    status:string
    authorizedUserId: number | null
    isAuth: boolean
};
type MapDispatchToPropsType = {
    getUserProfile: (userId: number | null) => void
    getStatus:(userId: number | null) => void
    updateStatus:(status: string) => void
};

let MapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        userProfile: state.profilePage.userProfile,
        status: state.profilePage.status,
        authorizedUserId:state.auth.userId,
        isAuth: state.auth.isAuth,
    }
}


export default compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(MapStateToProps, {
        getUserProfile: getUserProfileTC,
        getStatus: getStatusTC,
        updateStatus: updateStatusTC
    }),
    withRouter,
    WithAuthRedirect
)(ProfileContainer)


//ProfileInfo => Profile => ProfileContainer (my comp.)=> AuthRedirectComponent - 'hoc redirect login' => WithUrlDataContainerComponent(comp. withRouter ) => WithUrlDataContainerComponentContainer2' ( with connect )