import React from 'react';
import './App.css';
import {NavBar} from './Components/NavBar/NavBar'
import {HashRouter, Route, withRouter, Switch, Redirect} from 'react-router-dom';
import {Music} from './Components/Music/Music';
import UsersContainer from './Components/Users/UsersContainer';
import ProfileContainer from './Components/Profile/ProfileContainer';
import HeaderContainer from './Components/Header/HeaderContainer';
import LoginPage from './Components/Login/Login';
import {connect, Provider} from 'react-redux';
import {AppStateType, store} from './redux/redux-store';
import {initializeAppTC} from './redux/app-reducer';
import {compose} from 'redux';
import {Preloader} from './common/Preloader/Preloader';
import {WithSuspense} from './hoc/WithSuspense';

const DialogsContainer = React.lazy(() => import('./Components/Dialogs/DialogsContainer'));

class App extends React.Component<mapStateToPropsType & mapDispatchToPropsType> {

    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized) return <Preloader/>

        return (
            <div className='App_wrapper'>
                <HeaderContainer/>
                <NavBar/>
                <div className='App_wrapper__content'>
                    <Switch>
                        <Route exact path={'/'}
                               render={() => <Redirect to={'/profile'}/>}
                        />
                        <Route path={'/profile/:userId?'}
                               render={WithSuspense(ProfileContainer)}
                        />
                        <Route path={'/login'}
                               render={() => <LoginPage/>}
                        />
                        <Route path={'/dialogs'}
                               render={WithSuspense(DialogsContainer)}
                        />
                        <Route path={'/users'}
                               render={() => <UsersContainer/>}
                        />
                        <Route path={'/music'}
                               render={() => <Music/>}
                        />
                        <Route path={'*'}
                               render={() => <div> Sorry, Page NOT FOUND</div>}
                        />
                    </Switch>
                </div>
            </div>
        );
    }
}


type mapDispatchToPropsType = {
    initializeApp: () => void
}
type mapStateToPropsType = {
    initialized: boolean
}
const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
})
const AppContainer = compose<React.ComponentType>(
    withRouter,
    connect<mapStateToPropsType, mapDispatchToPropsType, {}, AppStateType>(mapStateToProps, {initializeApp: initializeAppTC}))
(App);


export const WrappedApp: React.FC = () => {
    return <HashRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </HashRouter>
}

