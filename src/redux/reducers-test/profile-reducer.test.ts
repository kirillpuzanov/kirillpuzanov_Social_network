import {v1} from 'uuid';
import {InitialStateProfileType, profileActions, profileReducer, UserProfileType} from '../profile-reducer';

let startState: InitialStateProfileType = {
    postsData:
        [
            {id: v1(), message: 'Hi, how are you?', likes: 7},
            {id: v1(), message: 'Hi, how are you?', likes: 7},
            {id: v1(), message: 'Hallo, i am fine!', likes: 10}
        ],
    userProfile: null as null | UserProfileType,
    status: '',
}

    // описание теста
test('new post should be added', () => {

    // формирование стартовых данных
    const action = profileActions.addPostActionCreator('new post test')
    //изменение
    const endState = profileReducer(startState, action)

    // ожидание , проверка результатов
    expect(endState.postsData[0].message).toBe('new post test')
    expect(endState.postsData.length).toBe(4)

});


