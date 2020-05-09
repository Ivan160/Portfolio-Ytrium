import React, { useState } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import './App.scss';

import Navbar from './components/Navbar/Navbar';
import { Home } from "./components/Content";
import Logo from "./components/Logo/Logo";

const App = () => {

    const [ isNavVisible, setNavVisible ] = useState(true);

    const toggleNavVisible = (): void => isNavVisible ? setNavVisible(false) : setNavVisible(true);

    return (
        <>
            <Logo isNavVisible={isNavVisible} toggleNavVisible={toggleNavVisible}/>
            <Navbar isNavVisible={isNavVisible} toggleNavVisible={toggleNavVisible}/>
            <div className={`content ${!isNavVisible && 'content-full'}`}>
                <Switch>
                    <Route path="/" component={Home}/>
                    <Route path="*" render={() => (<Redirect to="/"/>)}/>
                </Switch>
            </div>
        </>
    );
};

export default App;
