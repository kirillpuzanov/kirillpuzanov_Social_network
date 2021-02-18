//   1 исходные данныу
//  action , производим изменение
//  exptect , проверка результатов
import {followTC, initialStateUsersType, usersActions, usersReducer} from '../users-reducer';
import {ResponseType, ResultCodesEnum, usersAPI} from '../../api/api';

jest.mock('../api/api');

let state: initialStateUsersType;
// фунция позволяющая инициализировать исходный state перед каждым тестом.
beforeEach( ()=> {
    state = {
        users: [
            {
                id: '0',
                name: 'Kirill',
                followed: false,
                location: {city: 'SPb', country: 'RUS'},
                photos: {small: '', large: ''},
                status: 'status 0'
            },
            {
                id: '1',
                name: 'Ivan',
                followed: false,
                location: {city: 'SPb', country: 'RUS'},
                photos: {small: '', large: ''},
                status: 'status 2'
            },
            {
                id: '2',
                name: 'Egor',
                followed: true,
                location: {city: 'SPb', country: 'RUS'},
                photos: {small: '', large: ''},
                status: 'status 3'
            },
            {
                id: '3',
                name: 'Misha',
                followed: true,
                location: {city: 'SPb', country: 'RUS'},
                photos: {small: '', large: ''},
                status: 'status 4'
            }
        ],
        pageSize: 5,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: [],
        userId: '',
        filter: {
            term: '',
            friend: null as null | boolean,
        }
    }
})

test('follow success', () => {
   const newState =  usersReducer(state, usersActions.followSuccessAC('1') )
    expect(newState.users[0].followed ).toBeFalsy();
    expect(newState.users[1].followed ).toBeTruthy();
})
test('unFollow success', () => {
    const newState =  usersReducer(state, usersActions.unFollowSuccessAC('2') )
    expect(newState.users[0].followed ).toBeFalsy();
    expect(newState.users[2].followed ).toBeFalsy();
    expect(newState.users[3].followed ).toBeTruthy();
})


// test's thunk's ////////////////

// делаем фэйковый запрос на сервер с помощью jest.mock('../api/api'); см. импорты
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;
const result: ResponseType = {
    data:{},
    messages:[],
    resultCode: ResultCodesEnum.Success
}

usersAPIMock.follow.mockReturnValue(Promise.resolve(result));
test('success follow thunk', async ()=> {

    const thunk = followTC('1')
    const dispatchMock = jest.fn();
    const getStateMock = jest.fn();

    await thunk(dispatchMock,getStateMock,{} )
    // санка диспатчит 3 раза
    expect (dispatchMock).toBeCalledTimes(3)
    // санка диспатчит следующие AC...
    expect (dispatchMock).toHaveBeenNthCalledWith(1 , usersActions.toggleIsFollowingProgressAC(true,'1'))
    expect (dispatchMock).toHaveBeenNthCalledWith(2 , usersActions.followSuccessAC('1'))
    expect (dispatchMock).toHaveBeenNthCalledWith(3 , usersActions.toggleIsFollowingProgressAC(false,'1'))
})