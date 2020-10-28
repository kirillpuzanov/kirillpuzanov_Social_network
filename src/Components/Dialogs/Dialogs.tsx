import React from 'react';
import s from './Dialogs.module.css';
import {dialogsDataType, messagesDataType} from "../../redux/dialogs-reducer";
import {Dialog} from './Dialog/Dialog';
import {UserMessage} from "./UserMessage/UserMessage";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../../common/FormsControls/FormsControls";
import {FieldRequired, maxLengthCreator} from "../../utils/Validator";


type dialogsType = {
    messagesData: Array<messagesDataType>
    dialogsData: Array<dialogsDataType>
    sendMessage: (newTextBody: string) => void
}

export function Dialogs(props: dialogsType) {

    const {dialogsData, messagesData, sendMessage} = props
    const handleSubmit = (formData: AddMessageFormDataType) => {
        sendMessage(formData.newMessageBody)
    }
    return (
        <div className={s.dialogs_wrapper}>
            <div className={s.user_dialog}>
                {
                    dialogsData.map(dialog => <Dialog key={dialog.id} name={dialog.name} id={dialog.id}/>)
                }
            </div>
            <div className={s.user_message}>
                <AddMessageReduxForm onSubmit={handleSubmit}/>
                <div>
                    {
                        messagesData.map(message => <UserMessage key={message.id} id={message.id} text={message.text}/>)
                    }
                </div>
            </div>
        </div>
    )
}

const maxLength = maxLengthCreator(5)
type AddMessageFormDataType = { newMessageBody: string }
const AddMessageForm: React.FC<InjectedFormProps<AddMessageFormDataType>> = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <Field
                component={Textarea}
                name='newMessageBody'
                placeholder='your text'
                validate={[FieldRequired,maxLength]}
            />
            <button> send </button>
        </form>
    )
}

const AddMessageReduxForm = reduxForm<AddMessageFormDataType>({form: 'addMessageForm'})(AddMessageForm)
