import React from 'react';
import {connect} from 'react-redux';
import {
    FilterUserType,
    followTC,
    getUsersTC,
    initialStateUsersType,
    unfollowTC,
    usersActions
} from '../../redux/users-reducer';
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
    getTotalUsersCount, getUsersFilter, takeUsers,
} from '../../redux/selectors/users-selectors';


export type UsersContainerType = MapStateToPropsType & mapDispatchToPropsType;

// в React.Component<UsersContainerType, Array<UserType>>  : < тип пропсов самой компоненты, тип локального стейта внутри компоненты (если он есть) >
export class UsersContainer extends React.Component<UsersContainerType> {

    componentDidMount() {
        const {getUsers, currentPage, pageSize, filter} = this.props;
        getUsers(currentPage, pageSize, filter)
    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUsers(pageNumber, this.props.pageSize, this.props.filter)
    }

    onFilterChanged = (filter: FilterUserType) => {
        this.props.getUsers(1, this.props.pageSize, filter)
    }

    render() {
        const {users, pageSize, totalUsersCount, currentPage, followingInProgress, follow, unfollow} = this.props;
        return (
            <>
                {this.props.isFetching ? <Preloader/> : null}
                <Users
                    users={users}
                    pageSize={pageSize}
                    totalUsersCount={totalUsersCount}
                    currentPage={currentPage}
                    onPageChanged={this.onPageChanged}
                    onFilterChanged={this.onFilterChanged}
                    followingInProgress={followingInProgress}
                    follow={follow}
                    unfollow={unfollow}

                />
            </>
        )
    }
}

type MapStateToPropsType = initialStateUsersType
const mapStateToProps = (state: AppStateType): MapStateToPropsType => (
    {
        users: takeUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        userId: state.usersPage.userId,
        filter: getUsersFilter(state),
    }
)

type mapDispatchToPropsType = {
    toggleIsFetching: (isFetching: boolean) => void
    getUsers: (currentPage: number, pageSize: number, filter: FilterUserType) => void
    follow: (userId: string) => void
    unfollow: (userId: string) => void
}
const mapDispatchToProps = {
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