import * as serviceWorker from './serviceWorker';
import ReactDOM from 'react-dom';
import {WrappedApp} from './App';
import React from 'react';



ReactDOM.render(
    <WrappedApp/>
    , document.getElementById('root')
)


serviceWorker.unregister();

