import React from 'react';
import {connect} from "react-redux";
import {followTC, getUsersTC, initialStateUsersType, unfollowTC, usersActions} from "../../redux/users-reducer";
import {AppStateType} from "../../redux/redux-store";
import {Users} from "./Users";
import {Preloader} from "../../common/Preloader/Preloader";


export type UsersContainerType = MapStateToPropsType & mapDispatchToPropsType;

// в React.Component<UsersContainerType, Array<UserType>>  : < тип пропсов самой компоненты, тип локального стейта внутри компоненты (если он есть) >
export class UsersContainer extends React.Component<UsersContainerType> {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
        // this.props.toggleIsFetching(true)
        // usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then((response) => {
        //     this.props.toggleIsFetching(false)
        //     this.props.setUsers(response.items)
        //     this.props.setTotalUsersCount(response.totalCount)
        // });
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber);
        this.props.getUsers(pageNumber, this.props.pageSize)
        // this.props.toggleIsFetching(true)
        //
        // usersAPI.getUsers(pageNumber, this.props.pageSize).then((response) => {
        //     this.props.toggleIsFetching(false)
        //     this.props.setUsers(response.items)
        // });
    }

    render() {
        return (
            <>
                {this.props.isFetching ? <Preloader/> : null}
                <Users
                    users={this.props.users}
                    followSuccess={this.props.followSuccess}
                    unFollowSuccess={this.props.unFollowSuccess}
                    pageSize={this.props.pageSize}
                    totalUsersCount={this.props.totalUsersCount}
                    currentPage={this.props.currentPage}
                    onPageChanged={this.onPageChanged}
                    followingInProgress={this.props.followingInProgress}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}

                />
            </>
        )
    }
}


type MapStateToPropsType = initialStateUsersType;
const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,
        userId: state.usersPage.userId,
    }
}
type mapDispatchToPropsType = {
    followSuccess: (userId: string) => void
    unFollowSuccess: (userId: string) => void
    setCurrentPage: (currentPage: number) => void
    toggleIsFetching: (isFetching: boolean) => void
    getUsers: (currentPage: number, pageSize: number) => void
    follow: (userId: string) => void
    unfollow: (userId: string) => void
}

export default connect(mapStateToProps, {
        followSuccess: usersActions.followSuccessAC,
        unFollowSuccess: usersActions.unFollowSuccessAC,
        setCurrentPage: usersActions.setCurrentPageAC,
        toggleIsFetching: usersActions.toggleIsFetchingAC,
        getUsers: getUsersTC,
        follow: followTC,
        unfollow: unfollowTC,


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