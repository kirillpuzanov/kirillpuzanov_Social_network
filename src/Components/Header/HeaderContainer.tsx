import React from 'react';
import {Header} from "./Header";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {authActions, authDataType} from "../../redux/auth-reducer";
import {headerAPI} from "../../api/api";


type mapStateToPropsType = {
    login: null | number
    isFetching: null | boolean
    isAuth: boolean
};

type mapDispatchToPropsType = {
    setAuthUserData: (data: authDataType) => void
};

type HeaderContainerType = mapStateToPropsType & mapDispatchToPropsType;

class HeaderContainer extends React.Component<HeaderContainerType> {

    componentDidMount() {
        headerAPI.getAuth().then((response) => {
                if (response.resultCode === 0) {
                    this.props.setAuthUserData(response.data)
                }

            })
    }

    render() {
        return <Header
                       login={this.props.login}
                       isAuth={this.props.isAuth}
                       isFetching={this.props.isFetching}
        />
    }
}


const mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    return {
        login: state.auth.login,
        isFetching: state.auth.isFetching,
        isAuth: state.auth.isAuth,
    }
}



export default connect(mapStateToProps, {
    setAuthUserData: authActions.setAuthUserDataAC,
})(HeaderContainer)




