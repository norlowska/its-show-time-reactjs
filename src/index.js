import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore, applyMiddleware } from 'redux';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import { saveState } from './localStorage';
import { USER_MOVIES } from './constants'

const store = createStore(
    rootReducer, 
    applyMiddleware(thunk)
);

store.subscribe(() => {
    console.log(store.getState())
    saveState({
      USER_MOVIES: store.getState().moviesLists.USER_MOVIES.items
    }, USER_MOVIES)
  })

ReactDOM.render(
    <Provider store={store}>
        <App />
        </Provider>,
    document.getElementById('root'));

serviceWorker.unregister();
