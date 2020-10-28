import React from "react";
import styles from './FormControl.module.css';
import {WrappedFieldMetaProps, WrappedFieldProps} from "redux-form";

type FormControlsPropsType = {
    meta: WrappedFieldMetaProps
}

export const FormControl: React.FC<FormControlsPropsType> = ({meta, children}) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={hasError ? styles.error : ''}>
            <div>
                {children}
            </div>
            {hasError && <span> {meta.error} </span>}
        </div>
    )
}

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}> <textarea {...input} {...restProps}/></FormControl>
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}> <input {...input} {...restProps}/></FormControl>
}
