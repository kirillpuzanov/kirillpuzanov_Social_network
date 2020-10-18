import React from "react";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../redux/redux-store";
import {connect} from "react-redux";


type mapStatePropsType = { isAuth: boolean }
let mapStateToPropsForRedirect = (state: AppStateType): mapStatePropsType => ({
    isAuth: state.auth.isAuth
}as mapStatePropsType)

export function WithAuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>) {

    const RedirectComponent: React.FC<mapStatePropsType> = (props) => {
        let {isAuth, ...restProps} = props
        if (!props.isAuth) return <Redirect to={'/login'}/>
        return <WrappedComponent {...restProps as WCP}/>
    }

    let ConnectedAuthRedirect = connect<mapStatePropsType,{},WCP,AppStateType>(mapStateToPropsForRedirect, {})(RedirectComponent);
    return ConnectedAuthRedirect
}