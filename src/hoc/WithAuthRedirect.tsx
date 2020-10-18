import React from "react";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../redux/redux-store";
import {connect} from "react-redux";


type mapStateToPropsForRedirectType = { isAuth: boolean }
let mapStateToPropsForRedirect = (state: AppStateType): mapStateToPropsForRedirectType=> ({
        isAuth: state.auth.isAuth
})
export const WithAuthRedirect = (Component:any)=> {

    class RedirectComponent extends React.Component<any>{

        render(){
            if (!this.props.isAuth) return <Redirect to={'/login'}/>
            return <Component {...this.props}/>
        }
    }

    let ConnectedAuthRedirect = connect(mapStateToPropsForRedirect)(RedirectComponent);
    return ConnectedAuthRedirect
}