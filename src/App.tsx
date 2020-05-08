import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import './App.scss';

import Navbar from './components/Navbar/Navbar';
import { Home } from "./components/Content";

const App = () => (
    <>
        <Navbar/>
        <div className={'content'}>
            <Switch>
                <Route path="/" component={Home}/>
                <Route path="*" render={() => (<Redirect to="/"/>)}/>
            </Switch>
        </div>
    </>
);

export default App;
