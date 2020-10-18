import React from "react";

type ProfileStatusType = {
    status: string
}
type LocalStateType = {
    editMode: boolean
}


export class ProfileStatus extends React.Component<ProfileStatusType, LocalStateType> {

    state = {
        editMode: false
    }
    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }
    deActivateEditMode = (e:React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            editMode: false
        })
    }

    render() {
        return (
            <div>
                {this.state.editMode
                    ? <input
                        autoFocus={true}
                        onBlur={this.deActivateEditMode}
                        value={this.props.status}
                        onChange={this.deActivateEditMode}
                    />
                    : <span  onDoubleClick={this.activateEditMode}>{this.props.status} </span>
                }
            </div>
        )
    }
}