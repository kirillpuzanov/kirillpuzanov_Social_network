import React from 'react';
import './App.css';
import {NavBar} from './Components/NavBar/NavBar'
import {Route} from "react-router-dom";
import {News} from "./Components/News/News";
import {Music} from "./Components/Music/Music";
import {Sattings} from "./Components/Sattings/Sattings";
import DialogsContainer from "./Components/Dialogs/DialogsContainer";
import UsersContainer from "./Components/Users/UsersContainer";
import ProfileContainer from "./Components/Profile/ProfileContainer";
import HeaderContainer from "./Components/Header/HeaderContainer";



function App() {

    return (
        <div className='App_wrapper'>
            <HeaderContainer  />
            <NavBar/>
            <div className='App_wrapper__content'>
                <Route path={'/profile/:userId?'}
                       render={() => <ProfileContainer/>}
                />
                <Route path={'/dialogs'}
                       render={() => <DialogsContainer/>}
                />
                <Route path={'/users'}
                       render={() => <UsersContainer/>}
                />
                <Route render={() => <News/>} path={'/news'}/>
                <Route render={() => <Music/>} path={'/music'}/>
                <Route render={() => <Sattings/>} path={'/sattings'}/>
                {/*<Route render={() => <Friends myFriends={state.sideBar.myFriends}/>} path={'/friends'}/>*/}
            </div>
        </div>
    );
}


export default App;

