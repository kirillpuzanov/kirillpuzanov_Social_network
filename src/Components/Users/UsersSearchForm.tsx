import {Field, Form, Formik} from 'formik';
import React from 'react';
import {FilterUserType} from '../../redux/users-reducer';
import {useSelector} from 'react-redux';
import {getUsersFilter} from '../../redux/selectors/users-selectors';

const usersSearchFormValidate = (values: UsersSearchFormType) => {
    return {} as UsersSearchFormType;
}
export const UsersSearchForm: React.FC<userFormPropsType> = React.memo((props) => {
    const filter = useSelector(getUsersFilter)
    const submit = (values: UsersSearchFormType,
                    {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const filter = {
            searchUserName: values.searchUserName,
            friend: values.friend === 'null' ? null : values.friend === 'true'
        }
        props.onFilterChanged(filter)
        setSubmitting(false)
        console.log(filter)
    }

    return (
        <div>
            <Formik
                enableReinitialize
                initialValues={{searchUserName: filter.searchUserName, friend: String(filter.friend) as FriendFormType}}
                validate={usersSearchFormValidate}
                onSubmit={submit}
            >
                {({isSubmitting}) => (
                    <Form>
                        <Field type="text" name="searchUserName"/>
                        <Field name='friend' as='select'>
                            <option value='null'> All</option>
                            <option value='true'> Only Followed</option>
                            <option value='false'> Only Unfollowed</option>
                        </Field>
                        <button type="submit" disabled={isSubmitting}>
                            Find
                        </button>
                    </Form>
                )}
            </Formik>

        </div>
    )
})
type UsersSearchFormType = {
    searchUserName: string
    friend: 'true' | 'false' | 'null'
}
type userFormPropsType = {
    onFilterChanged: (filter: FilterUserType) => void
}

type FriendFormType = 'true' | 'false' | 'null'