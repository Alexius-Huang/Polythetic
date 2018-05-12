import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const history = createHistory();

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById('root')
);
registerServiceWorker();