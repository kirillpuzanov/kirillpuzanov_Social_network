import React from 'react';
import {connect} from "react-redux";
import {Users} from "./Users";
import {initialStateUsersType, usersActions, UsersActionsType, UserType} from "../../redux/users-reducer";
import {AppStateType} from "../../redux/redux-store";
import {Dispatch} from "redux";



type MapStateToPropsType = initialStateUsersType;
type mapDispatchToPropsType = {
    follow: (userId: string) => void
    unFollow: (userId: string) => void
    setUsers: (users: Array<UserType>) => void
}
// type UsersContainerType = MapStateToPropsType & mapDispatchToPropsType;

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: state.usersPage.users
    }
}

const mapDispatchToProps = (dispatch:Dispatch<UsersActionsType>): mapDispatchToPropsType => {
    return {
        follow: (userId) => {
            dispatch(usersActions.followAC(userId))
        },
        unFollow: (userId) => {
            dispatch(usersActions.unFollowAC(userId))
        },
        setUsers: (users) => {
            dispatch(usersActions.setUsersAC(users))
        },

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Users)
/*const mapDispatchToProps = () => {
    return {
        follow: usersActions.followAC,
        unFollow: usersActions.unFollowAC,
        setUsers: usersActions.setUsersAC,
    }
}*/
// export function UsersContainer(props:UsersContainerType ) {
//     const changeToFollow = (userId:string)=> {props.follow(userId)};
//     const changeToUnFollow = (userId:string)=> {props.unFollow(userId)};
//     const setUsers = (users: Array<UserType>) => {props.setUsers(users)}
//     return (
//         <Users
//             users={props.users}
//             follow={changeToFollow}
//             unFollow={changeToUnFollow}
//             setUsers={setUsers}
//         />
//     )
// }

