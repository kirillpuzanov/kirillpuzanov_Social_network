import React, {useState} from 'react';
import {UserProfileType} from '../../../redux/profile-reducer';
import {Preloader} from '../../../common/Preloader/Preloader';
import avaUserDefault from '../../../assets/img/user-png-2.png';
import {ProfileStatus} from './ProfileStatus';
import {ProfileData} from './ProfileData';
import ProfileDataReduxForm from './ProfileDataForm';


type ProfileInfoType = {
    userProfile: UserProfileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (profile: UserProfileType) => Promise<any>
}
let style = {
    width: '60px',
    margin: '40px'
}

export const    ProfileInfo = (props: ProfileInfoType) => {
    const {userProfile, status, updateStatus, isOwner, savePhoto, saveProfile} = props;
    const [editMode, setEditMode] = useState(false)

    if (!userProfile) return <Preloader/>

    const onPhotoSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        const photoFile = e.target.files;
        if (photoFile && photoFile.length) {
            savePhoto(photoFile[0])
        }
    }
    const toEditMode = () => setEditMode(true)

    const onSubmit = (formData: UserProfileType) => {
        //из санки можно вернуть промис, далее setEditMode только в случае удачного выполнения промиса
        saveProfile(formData).then(()=>setEditMode(false))
    }
    return (<>
            <div>
                <img style={style}
                     src={userProfile.photos.small || avaUserDefault}
                     alt="userPhoto"
                />
                {isOwner && <input type="file" onChange={onPhotoSelected}/>}
                <ProfileStatus status={status} updateStatus={updateStatus}/>

                {editMode
                    ? <ProfileDataReduxForm
                        initialValues={userProfile}
                        userProfile={userProfile}
                        onSubmit={onSubmit}/>
                    : <ProfileData toEditMode={toEditMode}
                                   isOwner={isOwner}
                                   userProfile={userProfile}/>}
            </div>
        </>
    )
}



