import React from "react";
import LoginReduxForm, {LoginFormDataType} from "./LoginForm";



type LoginType = {}

export const LoginPage: React.FC<LoginType> = (props) => {

    const onSubmit = (formData:LoginFormDataType)=> {
        console.log(formData)
    }

    return (
        <div>
            <h1> LOGIN </h1>
           <LoginReduxForm  onSubmit={onSubmit}/>
        </div>
    )
}


