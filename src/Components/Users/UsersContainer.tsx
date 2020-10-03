import React from 'react';
import {connect} from "react-redux";
import {initialStateUsersType, usersActions, UserType} from "../../redux/users-reducer";
import {AppStateType} from "../../redux/redux-store";
import axios from "axios";
import {Users} from "./Users";
import {Preloader} from "../../common/Preloader/Preloader";

export type UsersContainerType = MapStateToPropsType & mapDispatchToPropsType;

// в React.Component<UsersContainerType, Array<UserType>>  : < тип пропсов самой компоненты, тип локального стейта внутри компоненты (если он есть) >
export class UsersContainer extends React.Component<UsersContainerType> {

    componentDidMount() {
        this.props.toggleIsFetching(true)
        axios.get<{ items: Array<UserType>, totalCount: number, error: null | string }>(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`,{withCredentials:true})
            .then((response) => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(response.data.items)
                this.props.setTotalUsersCount(response.data.totalCount)
            });
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber);
        this.props.toggleIsFetching(true)
        axios.get<{ items: Array<UserType>, totalCount: number, error: null | string }>(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`,{withCredentials:true})
            .then((response) => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(response.data.items)
            });
    }

    render() {

        return (
            <>
                {this.props.isFetching ? <Preloader/> : null}
                <Users
                    users={this.props.users}
                    follow={this.props.follow}
                    unFollow={this.props.unFollow}
                    pageSize={this.props.pageSize}
                    totalUsersCount={this.props.totalUsersCount}
                    currentPage={this.props.currentPage}
                    onPageChanged={this.onPageChanged}

                />
            </>
        )
    }
}


type MapStateToPropsType = initialStateUsersType;
type mapDispatchToPropsType = {
    follow: (userId: string) => void
    unFollow: (userId: string) => void
    setUsers: (users: Array<UserType>) => void
    setCurrentPage: (currentPage: number) => void
    setTotalUsersCount: (totalUsersCount: number) => void
    toggleIsFetching: (isFetching: boolean) => void
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
    }
}

export default connect(mapStateToProps, {
        follow: usersActions.followAC,
        unFollow: usersActions.unFollowAC,
        setUsers: usersActions.setUsersAC,
        setCurrentPage: usersActions.setCurrentPageAC,
        setTotalUsersCount: usersActions.setTotalUsersCountAC,
        toggleIsFetching: usersActions.toggleIsFetchingAC,
    }
)(UsersContainer)

// const mapDispatchToProps = (dispatch: Dispatch<UsersActionsType>): mapDispatchToPropsType => {
//     return {
//         follow: (userId) => {
//             dispatch(usersActions.followAC(userId))
//         },
//         unFollow: (userId) => {
//             dispatch(usersActions.unFollowAC(userId))
//         },
//         setUsers: (users) => {
//             dispatch(usersActions.setUsersAC(users))
//         },
//         setCurrentPage: (currentPage) => {
//             dispatch(usersActions.setCurrentPageAC(currentPage))
//         },
//         setTotalUsersCount: (totalUsersCount) => {
//             dispatch(usersActions.setTotalUsersCountAC(totalUsersCount))
//         },
//         toggleIsFetching: (isFetching) => {
//             dispatch(usersActions.toggleIsFetchingAC(isFetching))
//         }
//
//     }
// }