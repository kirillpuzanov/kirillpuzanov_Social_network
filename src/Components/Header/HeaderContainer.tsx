import React from 'react';
import {Header} from "./Header";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {getAuthUserDataTC} from "../../redux/auth-reducer";


type HeaderContainerType = mapStateToPropsType & mapDispatchToPropsType;

class HeaderContainer extends React.Component<HeaderContainerType> {

    componentDidMount() {
        this.props.getAuthUserData()
    }

    render() {
        return <Header
                       login={this.props.login}
                       isAuth={this.props.isAuth}
                       isFetching={this.props.isFetching}
        />
    }
}

type mapStateToPropsType = {
    login: null | number
    isFetching: null | boolean
    isAuth: boolean
};

type mapDispatchToPropsType = {
    getAuthUserData: () => void
};


const mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    return {
        login: state.auth.login,
        isFetching: state.auth.isFetching,
        isAuth: state.auth.isAuth,
    }
}

export default connect(mapStateToProps, {
   getAuthUserData: getAuthUserDataTC
})(HeaderContainer)




