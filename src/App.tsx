import React from 'react';
import './App.css';
import {Header} from './Components/Header/Header'
import {NavBar} from './Components/NavBar/NavBar'
import {Profile} from './Components/Profile/Profile';
import {BrowserRouter, Route} from "react-router-dom";
import {News} from "./Components/News/News";
import {Music} from "./Components/Music/Music";
import {Sattings} from "./Components/Sattings/Sattings";
import {storeType} from "./redux/redux-store";
import {Friends} from "./Components/Friends/Friends";
import {DialogsContainer} from "./Components/Dialogs/DialogsContainer";

type appPropsType = {
    store: storeType
}


function App(props: appPropsType) {

    const state = props.store.getState();
    return (
        <BrowserRouter>
            <div className='App_wrapper'>
                <Header/>
                <NavBar/>
                <div className='App_wrapper__content'>
                    <Route path={'/profile'}
                           render={() => <Profile
                               /*postsData={state.profilePage.postsData}
                               newPostText={state.profilePage.newPostText}
                               dispatch={props.store.dispatch.bind(props.store)}*/
                               store={props.store}
                           />}
                    />
                    <Route path={'/dialogs'}
                           render={() => <DialogsContainer
                               store={props.store}/>
                               // messagesData={state.messagesPage.messagesData}
                               // dialogsData={state.messagesPage.dialogsData}
                           }
                    />
                    <Route render={() => <News/>} path={'/news'}/>
                    <Route render={() => <Music/>} path={'/music'}/>
                    <Route render={() => <Sattings/>} path={'/sattings'}/>
                    <Route render={() => <Friends myFriends={state.sideBar.myFriends}/>} path={'/friends'}/>
                </div>
            </div>
        </BrowserRouter>
    );
}


export default App;

