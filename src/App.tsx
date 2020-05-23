import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import anime from 'animejs';
import './App.scss';

import Navbar from './components/Navbar/Navbar';
import { Home } from "./components/Content";
import Logo from "./components/Logo/Logo";

const App: FC = () => {
   const navWidth: number = 62;
   const contentRadius: number = 40;
   const menuWidth: number = 250;
   const resize = useRef<HTMLSpanElement>(null);
   const content = useRef<HTMLDivElement>(null);
   const presentation = useRef<HTMLDivElement>(null);

   const [ isHold, setHold ] = useState<boolean>(false);

   const [ spanPosition, setSpanPosition ] = useState<number>(navWidth);
   const [ presentPosition, setPresentPosition ] = useState<number>(0);

   const [ margin, setMargin ] = useState<number>(navWidth);
   const [ translate, setTranslate ] = useState<number>(0);

   useEffect(() => {
      anime({
         targets: presentation.current,
         width: {
            value: `${presentPosition}px`,
            delay: isHold ? 0 : 1000,
            duration: 600
         },
         opacity: isHold ? 1 : [
            {
               value: 1,
               duration: 180,
            },
            {
               value: 0,
               duration: 180
            }
         ],
         easing: 'easeOutQuart',
      });
   }, [ isHold, presentPosition ]);

   const mouseMove = useCallback((event: MouseEvent) => {
      const mouseMoveX: number = event.pageX;
      if (mouseMoveX >= 0 && mouseMoveX <= menuWidth) {
         // @ts-ignore
         resize.current.style.transform = `translate(${mouseMoveX}px, -50%)`
         if (mouseMoveX > navWidth + 50) setPresentPosition(menuWidth);
         else if (mouseMoveX < navWidth - 20) setPresentPosition(0);
         else setPresentPosition(navWidth);
      }
   }, []);

   const mouseDown = useCallback((event: MouseEvent) => {
      event.preventDefault();
      if (event.target !== resize.current) return;
      document.body.style.cursor = 'ew-resize';
      setSpanPosition(spanPosition - 1);
      setHold(true);
      setPresentPosition(spanPosition);
      document.addEventListener('mousemove', mouseMove);
   }, [ spanPosition, mouseMove ]);

   const mouseUp = useCallback(() => {
      if (!isHold) return;
      document.removeEventListener('mousemove', mouseMove);
      document.body.style.cursor = 'default';
      setHold(false);
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
   }, [ presentPosition, isHold, mouseMove ]);

   useEffect(() => {
      document.body.addEventListener('mousedown', mouseDown);
      return () => document.body.removeEventListener('mousedown', mouseDown);
   }, [ mouseDown ]);

   useEffect(() => {
      document.body.addEventListener('mouseup', mouseUp);
      return () => document.body.removeEventListener('mouseup', mouseUp);
   }, [ mouseUp ]);

   useEffect(() => {
      document.body.style.cursor = 'default'
   }, []);

   const doubleClick = useCallback((e: React.MouseEvent<HTMLSpanElement>) => {
      e.preventDefault();
      setSpanPosition(navWidth);
      setMargin(navWidth);
      setTranslate(0);
   }, []);

   return (
      <>
         <Logo isOpenMenu={translate} isOpenNav={margin}/>

         <div className="presentation" ref={presentation}/>

         <Navbar isOpenMenu={translate}/>
         <span className={'resize'} ref={resize}
               onDoubleClick={doubleClick}
               style={{ transform: `translate(${spanPosition}px, -50%)` }}/>
         <div className={`content`} ref={content}
              style={{
                 marginLeft: `${margin}px`,
                 //paddingRight: `${margin}px`,
                 transform: `translateX(${translate}px)`,
                 borderRadius: `${margin === 0 ? 0 : `${contentRadius}px 0 0 ${contentRadius}px`}`
              }}>
            <Switch>
               <Route path="/" render={() => (<Home isOpenNav={margin}/>)}/>
               <Route path="*" render={() => (<Redirect to="/"/>)}/>
            </Switch>
         </div>
      </>
   );
};

export default App;
