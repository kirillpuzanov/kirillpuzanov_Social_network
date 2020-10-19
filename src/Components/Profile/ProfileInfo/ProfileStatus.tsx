import React from "react";

type ProfileStatusType = {
    status: string
    updateStatus: (status: string) => void
}
type LocalStateType = {
    editMode: boolean
    status:string
}


export class ProfileStatus extends React.Component<ProfileStatusType, LocalStateType> {

    state = {
        editMode: false,
        status: this.props.status
    }
    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }
    deActivateEditMode = () => {
        this.setState({
            editMode: false
        })
        this.props.updateStatus(this.state.status);
    }
    onStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            this.setState({
                status: e.currentTarget.value
            })
    }


    render() {
        return (
            <div>
                {this.state.editMode
                    ? <input
                        autoFocus={true}
                        onBlur={this.deActivateEditMode}
                        value={this.state.status}
                        onChange={this.onStatusChange}
                    />
                    : <span onDoubleClick={this.activateEditMode}>{this.props.status} </span>
                }
            </div>
        )
    }
}