import React from 'react';
import {connect} from 'react-redux';
import {followTC, getUsersTC, initialStateUsersType, unfollowTC, usersActions} from '../../redux/users-reducer';
import {AppStateType} from '../../redux/redux-store';
import {Users} from './Users';
import {Preloader} from '../../common/Preloader/Preloader';
import {WithAuthRedirect} from '../../hoc/WithAuthRedirect';
import {compose} from 'redux';
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount, takeUsers,

} from '../../redux/users-selectors';


export type UsersContainerType = MapStateToPropsType & mapDispatchToPropsType;

// в React.Component<UsersContainerType, Array<UserType>>  : < тип пропсов самой компоненты, тип локального стейта внутри компоненты (если он есть) >
export class UsersContainer extends React.Component<UsersContainerType> {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber);
        this.props.getUsers(pageNumber, this.props.pageSize)
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

type MapStateToPropsType = initialStateUsersType
const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: takeUsers(state),
        pageSize:getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
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
const mapDispatchToProps = {
    followSuccess: usersActions.followSuccessAC,
    unFollowSuccess: usersActions.unFollowSuccessAC,
    setCurrentPage: usersActions.setCurrentPageAC,
    toggleIsFetching: usersActions.toggleIsFetchingAC,
    getUsers: getUsersTC,
    follow: followTC,
    unfollow: unfollowTC,
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    WithAuthRedirect
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