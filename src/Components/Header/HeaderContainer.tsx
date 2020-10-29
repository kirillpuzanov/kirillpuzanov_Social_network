import React from 'react';
import {Header} from './Header';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {logoutTC} from '../../redux/auth-reducer';


type HeaderContainerType = mapStateToPropsType & mapDispatchToPropsType;

class HeaderContainer extends React.Component<HeaderContainerType> {



    render() {
        return <Header
            login={this.props.login}
            isAuth={this.props.isAuth}
            isFetching={this.props.isFetching}
            logout={this.props.logout}
        />
    }
}

type mapStateToPropsType = {
    login: null | string
    isFetching: null | boolean
    isAuth: boolean
};

type mapDispatchToPropsType = {
    logout: () => void
};


const mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    return {
        login: state.auth.login,
        isFetching: state.auth.isFetching,
        isAuth: state.auth.isAuth,
    }
}

export default connect(mapStateToProps, {
    logout: logoutTC,
})(HeaderContainer)




