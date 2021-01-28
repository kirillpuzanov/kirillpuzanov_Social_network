import React from 'react';
import LoginReduxForm, {LoginFormDataType} from './LoginForm';
import {useDispatch, useSelector} from 'react-redux';
import {loginTC} from '../../redux/auth-reducer';
import {AppStateType} from '../../redux/redux-store';
import {Redirect} from 'react-router-dom';


export const LoginPage: React.FC = (props) => {

    const captchaUrl = useSelector<AppStateType, null | string>(state => state.auth.captchaUrl)
    const isAuth = useSelector<AppStateType, boolean>(state => state.auth.isAuth)
    const dispatch = useDispatch();

    const onSubmit = (formData: LoginFormDataType) => {
        console.log(formData)
        dispatch(loginTC(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }
    if (isAuth) {
        return <Redirect to={'/profile'}/>
    }
    return (
        <div>
            <h1> LOGIN </h1>
            <LoginReduxForm captchaUrl={captchaUrl} onSubmit={onSubmit}/>
            <div>
                <p><b>For Testing:</b></p>
                <p>Email: free@samuraijs.com</p>
                <p>Password: free</p>
            </div>
        </div>
    )
}

// type MapDispatchToPropsType = {
//     login: (email: string, password: string, rememberMe: boolean,captcha:string) => void
//     logout: () => void
// }
// type MapStateToPropsType = { isAuth:boolean,capthaUrl:string | null}
// // const MapStateToProps = (state:AppStateType)=> ({
// //     isAuth: state.auth.isAuth,
// //     capthaUrl: state.auth.capthaUrl
// // })
//
// export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(MapStateToProps, {
//     login: loginTC,
//     logout: logoutTC
// })(LoginPage)
//

