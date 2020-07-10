import React from 'react';
import './App.css';
import {Header} from './Components/Header/Header'
import {NavBar} from './Components/NavBar/NavBar'
import {Profile} from './Components/Profile/Profile';
import {Dialogs} from "./Components/Dialogs/Dialogs";
import {BrowserRouter, Route} from "react-router-dom";
import {News} from "./Components/News/News";
import {Music} from "./Components/Music/Music";
import {Sattings} from "./Components/Sattings/Sattings";
import {AppPropsType} from '.';



function App(props: AppPropsType) {

    return (
        <BrowserRouter>
            <div className='App_wrapper'>
                <Header/>
                <NavBar/>
                <div className='App_wrapper__content'>
                    <Route render={() => <Dialogs messageData={props.messageData} dialogsData={props.dialogsData}  />} path={'/dialogs'}/>
                    <Route render={() => <Profile postsData ={props.postsData}  />} path={'/profile'}/>
                    <Route render={() => <News/>} path={'/news'}/>
                    <Route render={() => <Music/>} path={'/music'}/>
                    <Route render={() => <Sattings/>} path={'/sattings'}/>
                </div>
            </div>
        </BrowserRouter>
    );
}


export default App;

