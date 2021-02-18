import React, {useEffect} from 'react';
import {FilterUserType, followTC, getUsersTC, unFollowTC, UserType} from '../../redux/users-reducer';
import {Paginator} from '../../common/Paginator/Paginator';
import {User} from './User';
import {UsersSearchForm} from './UsersSearchForm';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount, getUsersFilter, getUsers
} from '../../redux/selectors/users-selectors';
import {useHistory} from 'react-router-dom';
import * as queryString from 'querystring';


// type UsersType = {}

type QueryParamsType = { term: string, page: string, friend: string };
export const Users = () => {


    const totalUsersCount = useSelector<AppStateType, number>(getTotalUsersCount);
    const currentPage = useSelector<AppStateType, number>(getCurrentPage)
    const users = useSelector<AppStateType, Array<UserType>>(getUsers);
    const pageSize = useSelector<AppStateType, number>(getPageSize);
    const followingInProgress = useSelector<AppStateType, Array<string>>(getFollowingInProgress);
    const filter = useSelector(getUsersFilter)

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        const parsed = queryString.parse(history.location.search.substr(1)) as QueryParamsType
        let actualPage = currentPage;
        let actualFilter = filter;

        if (parsed.page) actualPage = +parsed.page;
        if (parsed.term) actualFilter = {...actualFilter, term: parsed.term as string};
        if (parsed.friend) actualFilter = {
            ...actualFilter, friend: parsed.friend === 'null' ?
                null : parsed.friend === 'true'
        };
        dispatch(getUsersTC(actualPage, pageSize, actualFilter))
// eslint-disable-next-line
    }, [dispatch])
    useEffect(() => {
        const query = {} as QueryParamsType;

        if (filter.term) query.term = filter.term
        if (filter.friend !== null) query.friend = String(filter.friend)
        if (currentPage !== 1) query.page = String(currentPage)


        history.push({
            pathname: '/users',
            search: queryString.stringify(query)
            // search: `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`
        })
    }, [filter, currentPage, history])
    const onPageChanged = (pageNumber: number) => {
        dispatch(getUsersTC(pageNumber, pageSize, filter))
    }

    const onFilterChanged = (filter: FilterUserType) => {
        dispatch(getUsersTC(1, pageSize, filter))
    }
    const follow = (userId: string) => {
        dispatch(followTC(userId))
    }
    const unFollow = (userId: string) => {
        dispatch(unFollowTC(userId))
    }

    return (
        <div>
            <UsersSearchForm onFilterChanged={onFilterChanged}/>

            <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                       pageSize={pageSize} totalUsersCount={totalUsersCount} portionSize={5}
            />
            {
                users.map(u => <User key={u.id} user={u}
                                     follow={follow} unfollow={unFollow}
                                     followingInProgress={followingInProgress}
                />)
            }
        </div>
    )
}


