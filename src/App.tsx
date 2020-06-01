import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import anime from 'animejs';
import './App.scss';

import Navbar from './components/Navbar/Navbar';
import { Home } from "./components/Content";
import Logo from "./components/Logo/Logo";
import { NavContext } from './contexts/NavContext';

const App: FC = () => {
   const navWidth: number = 62;
   const contentRadius: number = 40;
   const menuWidth: number = 250;
   const minScreen: number = 780;
   const smallNav: number = 80;

   const resize = useRef<HTMLSpanElement>(null);
   const content = useRef<HTMLDivElement>(null);
   const presentation = useRef<HTMLDivElement>(null);
   const navbar = useRef<any>(null);

   const [ isMinScreen, setMinScreen ] = useState<boolean>(false);
   const [ margin, setMargin ] = useState<number>(0);
   const [ translate, setTranslate ] = useState<number>(0);

   const [ isHold, setHold ] = useState<boolean>(false);

   const [ spanPosition, setSpanPosition ] = useState<number>(0);
   const [ presentPosition, setPresentPosition ] = useState<number>(0);

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
         easing: 'easeOutQuart'
      });
   }, [ isHold, presentPosition ]);

   const mouseMove = useCallback((event: MouseEvent) => {
      const windowHeight = window.innerHeight;
      const mouseMoveX: number = event.pageX;
      const mouseMoveY: number = event.pageY;
      if (mouseMoveX >= 0 && mouseMoveX <= menuWidth && !isMinScreen) {
         // @ts-ignore
         resize.current.style.transform = `translate(${mouseMoveX}px, -50%)`
         if (mouseMoveX > navWidth + 50) setPresentPosition(menuWidth);
         else if (mouseMoveX < navWidth - 20) setPresentPosition(0);
         else setPresentPosition(navWidth);
      } else if (mouseMoveY >= windowHeight / 2 && mouseMoveY <= windowHeight - smallNav && isMinScreen) {
         const h = +(event.pageY - windowHeight / 2);
         navbar.current.style.transform = `translateY(${h}px)`;
         if (mouseMoveY <= windowHeight - (smallNav + 50)) setPresentPosition(0);
         else setPresentPosition(windowHeight / 2 - smallNav);
      }
   }, [ isMinScreen ]);

   const mouseDown = useCallback((event: any) => {
      event.preventDefault();
      if (event.target === resize.current && !isMinScreen) {
         document.body.style.cursor = 'ew-resize';
         setSpanPosition(spanPosition - 1);
         setHold(true);
         setPresentPosition(spanPosition);
         document.addEventListener('mousemove', mouseMove);
      } else if (isMinScreen && event.target.id === 'navbar') {
         document.body.style.cursor = 'ns-resize';
         setHold(true);
         document.addEventListener('mousemove', mouseMove);
      }

   }, [ spanPosition, mouseMove, isMinScreen ]);

   const mouseUp = useCallback(() => {
      if (isHold) {
         document.removeEventListener('mousemove', mouseMove);
         document.body.style.cursor = 'default';
         setHold(false);
         if (!isMinScreen) {
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
         } else if (isMinScreen) {
            navbar.current.style.transform = `translateY(${presentPosition}px)`
         }
      }
   }, [ presentPosition, isHold, mouseMove ]);

   useEffect(() => {
      document.body.addEventListener('mousedown', mouseDown);
      return () => document.body.removeEventListener('mousedown', mouseDown);
   }, [ mouseDown ]);

   useEffect(() => {
      document.body.addEventListener('mouseup', mouseUp);
      return () => document.body.removeEventListener('mouseup', mouseUp);
   }, [ mouseUp ]);

   const resizeWindow = useCallback(() => {
      if (window.innerWidth < minScreen) {
         setMinScreen(true);
         setSpanPosition(0);
         setMargin(0);
         setTranslate(0);
      } else if (window.innerWidth > minScreen) {
         setMinScreen(false);
         setSpanPosition(navWidth);
         setMargin(navWidth);
         setTranslate(0);
      }
   }, []);

   useEffect(() => {
      window.addEventListener('resize', resizeWindow);
      return () => window.removeEventListener('resize', resizeWindow);
   }, [ resizeWindow ]);

   useEffect(() => {
      document.body.style.cursor = 'default';
      let timeout: NodeJS.Timeout;
      if (window.innerWidth < minScreen) {
         setMinScreen(true);
      } else if (window.innerWidth > minScreen) {
         setMinScreen(false);
         timeout = setTimeout(() => {
            setMargin(navWidth);
            setSpanPosition(navWidth);
         }, 4000);
      }

      return () => clearTimeout(timeout);
   }, []);

   return (
      <NavContext.Provider value={{
         isMinScreen, isOpenMenu: translate, isOpenNav: margin
      }}>
         <Logo/>
         <Navbar refLink={navbar}/>
         {!isMinScreen && <div className="presentation" ref={presentation}/>}
         {!isMinScreen &&
            <span className={'resize'} ref={resize} style={{ transform: `translate(${spanPosition}px, -50%)` }}/>
         }
         <div className={`content`} ref={content}
              style={{
                 marginLeft: `${margin}px`,
                 transform: `translateX(${translate}px)`,
                 borderRadius: `${margin === 0 ? 0 : `${contentRadius}px 0 0 ${contentRadius}px`}`
              }}>
            <Switch>
               <Route path="/" render={() => (<Home/>)}/>
               <Route path="*" render={() => (<Redirect to="/"/>)}/>
            </Switch>
         </div>

      </NavContext.Provider>
   );
};

export default App;
