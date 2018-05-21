import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.sass';

/* React Router */
import { Router } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

/* Redux Setup */
import { Provider } from 'react-redux';
import { createStore /* , applyMiddleware */ } from 'redux';
import RootReducer from './reducers/Root.Reducer';

/* Redux Saga Setup */
// import createSagaMiddleware from 'redux-saga';
// import RootSaga from './sagas/RootSaga';

const history = createHistory();
// const sagaMiddleware = createSagaMiddleware();
const store = createStore(RootReducer); // , applyMiddleware(sagaMiddleware));

// sagaMiddleware.run(RootSaga);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
