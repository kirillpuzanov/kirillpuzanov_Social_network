import {Field, InjectedFormProps, reduxForm} from "redux-form";
import React from "react";

export type TextareaFormDataType = {
    newText: string
}
const TextareaForm: React.FC<InjectedFormProps<TextareaFormDataType>> = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component='textarea' placeholder='your text' name='newText'/>
            </div>
            <button>Send</button>
        </form>
    )
}
const TextAreaReduxForm = reduxForm<TextareaFormDataType>({form: 'TextareaForm'})(TextareaForm)
export default TextAreaReduxForm;