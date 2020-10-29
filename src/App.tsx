import React from 'react';
import './App.css';
import {NavBar} from './Components/NavBar/NavBar'
import {Route, withRouter} from 'react-router-dom';
import {News} from './Components/News/News';
import {Music} from './Components/Music/Music';
import {Settings} from './Components/Settings/Settings';
import DialogsContainer from './Components/Dialogs/DialogsContainer';
import UsersContainer from './Components/Users/UsersContainer';
import ProfileContainer from './Components/Profile/ProfileContainer';
import HeaderContainer from './Components/Header/HeaderContainer';
import LoginPage from './Components/Login/Login';
import {connect} from 'react-redux';
import {AppStateType} from './redux/redux-store';
import {initializeAppTC} from './redux/app-reducer';
import {compose} from 'redux';
import {Preloader} from './common/Preloader/Preloader';


class App extends React.Component<mapStateToPropsType & mapDispatchToPropsType> {

    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if(!this.props.initialized) return <Preloader/>

        return (
            <div className='App_wrapper'>
                <HeaderContainer/>
                <NavBar/>
                <div className='App_wrapper__content'>
                    <Route path={'/profile/:userId?'}
                           render={() => <ProfileContainer/>}
                    />
                    <Route path={'/login'}
                           render={() => <LoginPage/>}
                    />
                    <Route path={'/dialogs'}
                           render={() => <DialogsContainer/>}
                    />
                    <Route path={'/users'}
                           render={() => <UsersContainer/>}
                    />

                    <Route render={() => <News/>} path={'/news'}/>
                    <Route render={() => <Music/>} path={'/music'}/>
                    <Route render={() => <Settings/>} path={'/settings'}/>
                    {/*<Route render={() => <Friends myFriends={state.sideBar.myFriends}/>} path={'/friends'}/>*/}
                </div>
            </div>
        );
    }
}



type mapDispatchToPropsType = {
    initializeApp: ()=> void
}
type mapStateToPropsType = {
    initialized:boolean
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
})
export default compose<React.ComponentType>(
    withRouter,
    connect<mapStateToPropsType,mapDispatchToPropsType,{},AppStateType>(mapStateToProps, {initializeApp:initializeAppTC}))
(App);

