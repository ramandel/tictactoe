import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { createStore } from 'redux';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import grid from './reducers';

const store = createStore(grid);
store.dispatch({ type: 'RESET' })

const render = () => ReactDOM.render(
    <App
        {...store.getState()}
        onReset={() => store.dispatch({ type: 'RESET' })}
        registerClick={(row, column) => store.dispatch({ type: 'CLICK', row, column })}
    />, document.getElementById('root'));

render();
store.subscribe(render);
registerServiceWorker();
