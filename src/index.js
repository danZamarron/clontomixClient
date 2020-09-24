import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import "antd/dist/antd.css"
import Provider from "./context"

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
