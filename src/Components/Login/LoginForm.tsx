import React from "react";
import {Field, InjectedFormProps, reduxForm} from 'redux-form'

export type LoginFormDataType ={
    login:string
    password:string
    rememberMe:boolean
}

const LoginForm: React.FC<InjectedFormProps<LoginFormDataType>> = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component='input' type="text" name='login' placeholder='login'/>
            </div>
            <div>
                <Field component='input' type="password" name='password' placeholder='password'/>
            </div>
            <div>
                <Field component='input' type="checkbox" name='rememberMe'/> Remember me
            </div>
            <div>
                <button> Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm =  reduxForm<LoginFormDataType>({form: 'login'})(LoginForm)
export default LoginReduxForm
