import React from "react";
import {UserProfileType} from "../../../redux/profile-reducer";
import {Preloader} from "../../../common/Preloader/Preloader";
import avaUserDefault from "../../../assets/img/user-png-2.png";
import {ProfileStatus} from "./ProfileStatus";


type ProfileInfoType = {
    userProfile: UserProfileType | null
}
let style = {
    width: '60px',
    margin: '40px'

}

export const ProfileInfo = (props: ProfileInfoType) => {
    if (!props.userProfile) {
        return <Preloader/>
    }
    return (
        <div>
            <div>
                <img
                    src="https://fs.tonkosti.ru/sized/c1600x400/0r/77/rm/zc/xe/hc/80/go/08/08/kc/4k/0r77rmzcxehc80go0808kc4kc.jpg"
                    alt="img"/>
            </div>
            <div>
                <img style={style}
                     src={props.userProfile.photos.small !== null ? props.userProfile.photos.small : avaUserDefault}
                     alt="userPhoto"/>
                <ProfileStatus status={'status'}/>
            </div>
        </div>
    )
}
