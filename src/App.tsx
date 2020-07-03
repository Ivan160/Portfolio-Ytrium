import React, { FC, useCallback, useEffect, useRef, useState, lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import anime from 'animejs';
import './App.scss';

import Navbar from './components/Navbar/Navbar';
//import { Home, About, Works, Skills, Contact } from "./components/Content";
import Logo from "./components/Logo/Logo";
import { NavContext } from './contexts/NavContext';
import Preloader from "./components/Common/Preloader";

const Home = lazy(() => import('./components/Content/Home/Home'));
const About = lazy(() => import('./components/Content/About/About'));
const Works = lazy(() => import('./components/Content/Works/Works'));
const Skills = lazy(() => import('./components/Content/Skills/Skills'));
const Contact = lazy(() => import('./components/Content/Contact/Contact'));

const App: FC = () => {
   const navWidth: number = 62;
   const contentRadius: number = 40;
   const menuWidth: number = 250;
   const minScreen: number = 780;
   //const smallNav: number = 65;

   const resize = useRef<HTMLSpanElement>(null);
   const content = useRef<HTMLDivElement>(null);
   const presentation = useRef<HTMLDivElement>(null);
   const navbar = useRef<any>(null);

   const [ isMinScreen, setMinScreen ] = useState<boolean>(false);
   const [ margin, setMargin ] = useState<number>(navWidth);
   const [ translate, setTranslate ] = useState<number>(0);
   const [ isHold, setHold ] = useState<boolean>(false);
   const [ spanPosition, setSpanPosition ] = useState<number>(navWidth);
   const [ presentPosition, setPresentPosition ] = useState<number>(0);
   const [ isLoad, setLoad ] = useState<boolean>(true);

   const mouseMove = useCallback((event: MouseEvent) => {
      //const windowHeight: number = window.innerHeight;
      //const heightNav: number = windowHeight / 2.5;
      const mouseMoveX: number = event.pageX;
      //const mouseMoveY: number = event.pageY;
      if (mouseMoveX >= 0 && mouseMoveX <= menuWidth && !isMinScreen) {
         // @ts-ignore
         resize.current.style.transform = `translate(${mouseMoveX}px, -50%)`
         if (mouseMoveX > navWidth + 50) setPresentPosition(menuWidth);
         else if (mouseMoveX < navWidth - 20) setPresentPosition(0);
         else setPresentPosition(navWidth);
      }
      // else if (mouseMoveY >= windowHeight - heightNav && mouseMoveY <= windowHeight - smallNav && isMinScreen) {
      //    const h: number = +(event.pageY - (windowHeight - heightNav));
      //    navbar.current.style.transform = `translateY(${h}px)`;
      //    if (mouseMoveY <= windowHeight - (smallNav + 50)) setPresentPosition(0);
      //    else setPresentPosition(heightNav - smallNav);
      // }
   }, [ isMinScreen ]);

   const mouseDown = useCallback((event: any) => {
      if (event.target === resize.current && !isMinScreen) {
         document.body.style.cursor = 'ew-resize';
         setSpanPosition(spanPosition - 1);
         setHold(true);
         setPresentPosition(spanPosition);
         document.addEventListener('mousemove', mouseMove);
      }
      // else if (isMinScreen && event.target.id === 'navbar') {
      //    setHold(true);
      //    document.addEventListener('mousemove', mouseMove);
      // }
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
         }
         // else if (isMinScreen) {
         //    navbar.current.style.transform = `translateY(${presentPosition}px)`;
         // }
      }
   }, [ presentPosition, isHold, mouseMove ]);

   const resizeWindow = useCallback(() => {
      if (window.innerWidth <= minScreen) {
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

   const load = useCallback(() => {
      const timeout = setTimeout(() => document.readyState === 'complete' && setLoad(false), 1000);
      return () => clearTimeout(timeout);
   }, []);

   useEffect(() => {
      document.body.addEventListener('mousedown', mouseDown);
      document.body.addEventListener('mouseup', mouseUp);
      return () => {
         document.body.removeEventListener('mousedown', mouseDown);
         document.body.removeEventListener('mouseup', mouseUp);
      }
   }, [ mouseDown, mouseUp ]);

   useEffect(() => {
      resizeWindow();
      window.addEventListener('resize', resizeWindow);
      return () => window.removeEventListener('resize', resizeWindow);
   }, [ resizeWindow ]);

   useEffect(() => {
      anime({
         targets: presentation.current,
         width: { value: `${presentPosition}px`, delay: isHold ? 0 : 1000, duration: 600 },
         opacity: isHold ? 1 : [ { value: 1, duration: 180 }, { value: 0, duration: 180 } ],
         easing: 'easeOutQuart'
      });
   }, [ isHold, presentPosition ]);

   useEffect(() => {
      document.body.style.cursor = 'default';
      if (window.innerWidth <= minScreen) setMinScreen(true);
      else if (window.innerWidth > minScreen) setMinScreen(false);
   }, []);

   useEffect(() => {
      document.addEventListener('readystatechange', load);
      return () => document.removeEventListener('readystatechange', load);
   }, [ load ]);

   window.onselectstart = () => false;

   return (
      <NavContext.Provider value={{ isMinScreen, isOpenMenu: translate, isOpenNav: margin, setLoad: setLoad }}>

         {isLoad ? (<><Preloader/><div id='ff'><h1>1</h1><h2>2</h2><h3>3</h3><h4>4</h4></div></>) : (
            <>
               <Logo/>
               <Navbar refLink={navbar}/>

               {!isMinScreen && (<>
                     <div className="presentation" ref={presentation}/>
                     <span className={'resize'} ref={resize}
                           style={{ transform: `translate(${spanPosition}px, -50%)` }}/></>
               )}

               <div className={`content`} ref={content}
                    style={{
                       marginLeft: `${margin}px`,
                       paddingRight: `${margin}px`,
                       transform: `translateX(${translate}px)`,
                       borderRadius: `${margin === 0 ? 0 : `${contentRadius}px 0 0 ${contentRadius}px`}`
                    }}>
                  <Suspense fallback={<Preloader/>}>
                     <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/about" component={About}/>
                        <Route exact path="/works" component={Works}/>
                        <Route exact path="/skills" component={Skills}/>
                        <Route exact path="/contact" component={Contact}/>
                        <Route path="*" render={() => (<Redirect to="/"/>)}/>
                     </Switch>
                  </Suspense>
               </div>
            </>
         )}
      </NavContext.Provider>
   );
};

export default App;
