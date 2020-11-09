import React from 'react';
import {WrappedApp} from './App';
import ReactDOM from 'react-dom';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<WrappedApp />, div);
    ReactDOM.unmountComponentAtNode(div);
});
