import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { App } from './components/App';
import * as serviceWorker from './serviceWorker';
import { rootReducer } from './store/rootReducer';
import loadUsersSagaWatcher from './store/users/saga';

const sagaMiddleware = createSagaMiddleware();
const isDev = process.env.NODE_ENV !== 'production' && typeof window === 'object';
const composeSetup = isDev && ((window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose);
const store = createStore(rootReducer, composeSetup(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(loadUsersSagaWatcher);
// sagaMiddleware.run(pageLoadProfileSagaWatcher);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
