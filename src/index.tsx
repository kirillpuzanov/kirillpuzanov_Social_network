import * as serviceWorker from './serviceWorker';

import ReactDOM from "react-dom";
import App from "./App";
import React from "react";
import {store} from "./redux/redux-store";
import {stateType} from "./redux/store";

const renderThree = (state: stateType) => {

    ReactDOM.render(
        <App
            store={store}
            // dispatch={store.dispatch.bind(store)}
        />, document.getElementById('root')
    )
}

renderThree(store.getState())
store.subscribe(() => {
    let state = store.getState();
    renderThree(state);
});

serviceWorker.unregister();

