import React from 'react';
import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import {Input} from '../../common/FormsControls/FormsControls';
import {FieldRequired} from '../../utils/Validator';
import styles from './../../common/FormsControls/FormControl.module.css';

export type LoginFormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}
type Iprops = {
    captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormDataType, Iprops> & Iprops> = (props) => {
    const {handleSubmit, error} = props;
    return (

        <form onSubmit={handleSubmit}>
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
            {error && <div className={styles.formSummaryError}>
                {error}
            </div>}
            <div>
                <Field component='input'
                       type="checkbox"
                       name='rememberMe'
                /> Remember me
            </div>
            {props.captchaUrl && <img src={props.captchaUrl}/>}
            {props.captchaUrl &&
            <div>
               <Field component='input'
                      type="text"
                      name='captcha'
                      placeholder='anti bot symbols'
                      validate={[FieldRequired]}
               /> Enter symbols from image..
            </div>
            }
            <div>
                <button> Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<LoginFormDataType, Iprops>({form: 'login'})(LoginForm)
export default LoginReduxForm
