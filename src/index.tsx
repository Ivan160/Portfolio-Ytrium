import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import './i18n';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Preloader from "./components/Common/Preloader/Preloader";

ReactDOM.render(

      <BrowserRouter>
          <Suspense fallback={<Preloader/>}>
         <React.StrictMode>
            <App/>
         </React.StrictMode>
          </Suspense>
      </BrowserRouter>
   , document.getElementById('root')
);

serviceWorker.unregister();