import React from 'react';
import {store} from "./redux/redux-store";


export type providerType = {}

export const StoreContext = React.createContext(store);

/*
export const Provider = (props: providerType) => {
    return <StoreContext.Provider value={props.store}>
        {props.children}
    </StoreContext.Provider>
}*/
