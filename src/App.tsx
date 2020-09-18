import React from 'react';
import './App.css';
import {Header} from './Components/Header/Header'
import {NavBar} from './Components/NavBar/NavBar'
import {Profile} from './Components/Profile/Profile';
import {BrowserRouter, Route} from "react-router-dom";
import {News} from "./Components/News/News";
import {Music} from "./Components/Music/Music";
import {Sattings} from "./Components/Sattings/Sattings";
import DialogsContainer from "./Components/Dialogs/DialogsContainer";
import UsersContainer from "./Components/Users/UsersContainer";




function App() {

    return (
        <BrowserRouter>
            <div className='App_wrapper'>
                <Header/>
                <NavBar/>
                <div className='App_wrapper__content'>
                    <Route path={'/profile'}
                           render={() => <Profile/>}
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
        </BrowserRouter>
    );
}


export default App;

