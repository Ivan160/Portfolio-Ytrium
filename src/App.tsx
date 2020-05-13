import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
//import anime from 'animejs';
import './App.scss';

import Navbar from './components/Navbar/Navbar';
import { Home } from "./components/Content";
import Logo from "./components/Logo/Logo";

const App: FC = () => {
    const navWidth: number = 62;
    const resize = useRef<HTMLSpanElement>(null);

    const [ spanPosition, setSpanPosition ] = useState<number>(navWidth);
    const [ presentPosition, setPresentPosition ] = useState<number>(0);

    const [ margin, setMargin ] = useState<number>(navWidth);
    const [ translate, setTranslate ] = useState<number>(0);

    const [ isNavVisible, setNavVisible ] = useState<boolean>(true);
    const toggleNavVisible = (): void => isNavVisible ? setNavVisible(false) : setNavVisible(true);

    const mouseMove = useCallback((event: MouseEvent) => {
        const mouseMoveX: number = event.pageX;
        if (mouseMoveX >= 0 && mouseMoveX <= 300) {
            setSpanPosition(mouseMoveX);
            if (mouseMoveX > navWidth + 18) setPresentPosition(300);
            else if (mouseMoveX < navWidth - 18) setPresentPosition(0);
            else setPresentPosition(navWidth);
        }
    }, []);

    const mouseDown = useCallback((event: MouseEvent) => {
        if (event.target !== resize.current) return;
        event.preventDefault();
        setPresentPosition(spanPosition);
        document.addEventListener('mousemove', mouseMove);
    }, [ spanPosition, mouseMove ]);

    const mouseUp = useCallback((event: MouseEvent) => {
        if (event.target !== resize.current) return;
        document.removeEventListener('mousemove', mouseMove);
        setSpanPosition(presentPosition);
        if (presentPosition > navWidth) {
            setMargin(navWidth);
            setTranslate(presentPosition - navWidth);
        } else if (presentPosition < navWidth) {
            setMargin(0);
            setTranslate(0);
        } else {
            setMargin(navWidth);
            setTranslate(0);
        }
        setPresentPosition(0);
    }, [ presentPosition, mouseMove ]);

    useEffect(() => {
        document.body.addEventListener('mousedown', mouseDown);
        return () => document.body.removeEventListener('mousedown', mouseDown);
    }, [ mouseDown ]);

    useEffect(() => {
        document.body.addEventListener('mouseup', mouseUp);
        return () => document.body.removeEventListener('mouseup', mouseUp);
    }, [ mouseUp ]);

    return (
        <>
            <Logo isNavVisible={isNavVisible} toggleNavVisible={toggleNavVisible}/>

            <div className="presentation" style={{ width: `${presentPosition}px` }}/>

            <Navbar isNavVisible={isNavVisible} toggleNavVisible={toggleNavVisible}/>
            <span className={'resize'} ref={resize}
                  onDoubleClick={() => {
                      setSpanPosition(navWidth);
                      setMargin(navWidth);
                      setTranslate(0);
                  }}
                  style={{ transform: `translate(${spanPosition}px, -50%)` }}/>
            <div className={`content`} style={{ marginLeft: `${margin}px`, transform: `translateX(${translate}px)` }}>
                <p>spanPosition {spanPosition}</p>
                <p>presentPosition {presentPosition}</p>
                <Switch>
                    <Route path="/" component={Home}/>
                    <Route path="*" render={() => (<Redirect to="/"/>)}/>
                </Switch>
            </div>
        </>
    );
};

export default App;
