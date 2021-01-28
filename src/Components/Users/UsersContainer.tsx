import React from 'react';
import {useSelector} from 'react-redux';
import {Users} from './Users';
import {Preloader} from '../../common/Preloader/Preloader';
import {getIsFetching,} from '../../redux/selectors/users-selectors';


export const UsersPage = () => {
    const  isFetching = useSelector(getIsFetching)
    return (
        <>
            {isFetching ? <Preloader/> : null}
            <Users/>
        </>
    )
}

// в React.Component<UsersContainerType, Array<UserType>>  : < тип пропсов самой компоненты, тип локального стейта внутри компоненты (если он есть) >

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