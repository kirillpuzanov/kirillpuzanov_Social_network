import React from 'react';
import {UserProfileType} from '../../../redux/profile-reducer';
import {Preloader} from '../../../common/Preloader/Preloader';
import avaUserDefault from '../../../assets/img/user-png-2.png';
import {ProfileStatus} from './ProfileStatus';


type ProfileInfoType = {
    userProfile: UserProfileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
}
let style = {
    width: '60px',
    margin: '40px'
}

export const ProfileInfo = (props: ProfileInfoType) => {
    const {userProfile, status, updateStatus, isOwner, savePhoto} = props;
    if (!userProfile) return <Preloader/>

    const onPhotoSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        const photoFile = e.target.files;
        if (photoFile && photoFile.length) {
            savePhoto(photoFile[0])
        }
    }


    return (<>
            {/*<div>*/}
            {/*    <img*/}
            {/*        src="https://fs.tonkosti.ru/sized/c1600x400/0r/77/rm/zc/xe/hc/80/go/08/08/kc/4k/0r77rmzcxehc80go0808kc4kc.jpg"*/}
            {/*        alt="img"/>*/}
            {/*</div>*/}
            <div>
                <img style={style}
                     src={userProfile.photos.small || avaUserDefault}
                     alt="userPhoto"
                />
                {isOwner && <input type="file" onChange={onPhotoSelected}/>}
                <ProfileStatus
                    status={status}
                    updateStatus={updateStatus}
                />
            </div>
        </>
    )
}
