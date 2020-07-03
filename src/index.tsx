import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import './i18n';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
   <BrowserRouter>
      <React.StrictMode>
         <App/>
      </React.StrictMode>
   </BrowserRouter>
   , document.getElementById('root')
);

serviceWorker.unregister();