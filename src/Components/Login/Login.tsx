import React from "react";
import LoginReduxForm, {LoginFormDataType} from "./LoginForm";
import {connect} from "react-redux";
import {loginTC, logoutTC} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux-store";
import { Redirect } from "react-router-dom";



export const LoginPage: React.FC<MapStateToPropsType & MapDispatchToPropsType> = (props) => {

    const onSubmit = (formData: LoginFormDataType) => {
        console.log(formData)
        props.login(formData.email,formData.password,formData.rememberMe,formData.captcha)
    }
    if(props.isAuth){
        return <Redirect to={'/profile'}/>
    }

    return (
        <div>
            <h1> LOGIN </h1>
            <LoginReduxForm capthaUrl={props.capthaUrl} onSubmit={onSubmit}/>
            <div>
                <p><b>For Testing:</b></p>
                <p>Email: free@samuraijs.com</p>
                <p>Password: free</p>
            </div>
        </div>
    )
}

type MapDispatchToPropsType = {
    login: (email: string, password: string, rememberMe: boolean,captcha:string) => void
    logout: () => void
}
type MapStateToPropsType = { isAuth:boolean,capthaUrl:string | null}
const MapStateToProps = (state:AppStateType)=> ({
    isAuth: state.auth.isAuth,
    capthaUrl: state.auth.capthaUrl
})

export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(MapStateToProps, {
    login: loginTC,
    logout: logoutTC
})(LoginPage)


