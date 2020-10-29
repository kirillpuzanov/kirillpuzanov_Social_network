import React from "react";
import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import {Input} from "../../common/FormsControls/FormsControls";
import {FieldRequired, maxLengthCreator} from "../../utils/Validator";
import styles from './../../common/FormsControls/FormControl.module.css';

export type LoginFormDataType = {
    email: string
    password: string
    rememberMe: boolean
}

const LoginForm: React.FC<InjectedFormProps<LoginFormDataType>> = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Input}
                       type="email"
                       name='email'
                       placeholder='login'
                       validate={[FieldRequired]}
                />
            </div>
            <div>
                <Field component={Input}
                       type="password"
                       name='password'
                       placeholder='password'
                       validate={[FieldRequired]}
                />
            </div>
            {props.error && <div className={styles.formSummaryError}>
                {props.error}
            </div>}
            <div>
                <Field component='input'
                       type="checkbox"
                       name='rememberMe'
                /> Remember me
            </div>
            <div>
                <button> Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<LoginFormDataType>({form: 'login'})(LoginForm)
export default LoginReduxForm
