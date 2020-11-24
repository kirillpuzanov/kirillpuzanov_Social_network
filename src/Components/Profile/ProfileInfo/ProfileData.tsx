import {contactsType, UserProfileType} from '../../../redux/profile-reducer';
import React from 'react';

type ProfileDataType = {
    userProfile: UserProfileType
    isOwner: boolean
    toEditMode: () => void
}
export const ProfileData = (props: ProfileDataType) => {
    const {userProfile,isOwner,toEditMode} = props;
    return (
        <div>
            {isOwner && <button onClick={toEditMode}> Update Profile </button>}
            <div>FullName: {userProfile.fullName}</div>
            <div>Looking for a job: {userProfile.lookingForAJob ? 'yes' : 'no'}</div>
            <div>Skills : {userProfile.lookingForAJobDescription} </div>
            <div>About me: {userProfile.aboutMe}</div>
            <div>
                Contacts: {
                Object
                    .keys(userProfile.contacts)
                    .map((k) => {
                        return <Contact key={k} contactTitle={k}
                                        contactValue={userProfile.contacts[k as keyof contactsType]}/>
                    })}
            </div>
        </div>
    )
}

type ContactType = {
    contactTitle: string
    contactValue: string
}
export const Contact = (props: ContactType) => {
    return <div>{props.contactTitle} : {props.contactValue}</div>
}