import React, { FC, useCallback, useEffect, useRef, useState, lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import { NavContext } from './contexts/NavContext';
import anime from 'animejs';
import Preloader from "./components/Common/Preloader";
import Navbar from './components/Navbar/Navbar';
import Logo from "./components/Logo/Logo";
import './App.scss';

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

   const resize = useRef<HTMLSpanElement>(null);
   const content = useRef<HTMLDivElement>(null);
   const presentation = useRef<HTMLDivElement>(null);
   const navbar = useRef<HTMLElement>(null);

   const [ isMinScreen, setMinScreen ] = useState<boolean>(false);
   const [ isHold, setHold ] = useState<boolean>(false);
   const [ margin, setMargin ] = useState<number>(navWidth);
   const [ translate, setTranslate ] = useState<number>(0);
   const [ spanPosition, setSpanPosition ] = useState<number>(navWidth);
   const [ presentPosition, setPresentPosition ] = useState<number>(0);
   const [ isLoad, setLoad ] = useState<boolean>(true);

   const mouseMove = useCallback((event: MouseEvent) => {
      const mouseMoveX: number = event.pageX;
      const resizeElem = resize.current as HTMLElement;
      if (mouseMoveX >= 0 && mouseMoveX <= menuWidth && resizeElem && !isMinScreen) {
         resizeElem.style.transform = `translate(${mouseMoveX}px, -50%)`
         if (mouseMoveX > navWidth + 50) setPresentPosition(menuWidth);
         else if (mouseMoveX < navWidth - 20) setPresentPosition(0);
         else setPresentPosition(navWidth);
      }
   }, [ isMinScreen ]);

   const mouseDown = useCallback((event: MouseEvent) => {
      if (event.target === resize.current && !isMinScreen) {
         document.body.style.cursor = 'ew-resize';
         setSpanPosition(spanPosition - 1);
         setHold(true);
         setPresentPosition(spanPosition);
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
         }
      }
   }, [ presentPosition, isHold, mouseMove, isMinScreen ]);

   const resizeWindow = useCallback(() => {
      if (window.innerWidth <= minScreen) {
         setMinScreen(true);
         setSpanPosition(0);
         setMargin(0);
         setTranslate(0);
      } else {
         setMinScreen(false);
         setSpanPosition(navWidth);
         setMargin(navWidth);
         setTranslate(0);
      }
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
      window.innerWidth <= minScreen ? setMinScreen(true) : setMinScreen(false);
   }, []);

   const load = useCallback(() => setTimeout(() => setLoad(false), 1000), []);
   useEffect(() => {
      window.addEventListener('load', load);
      window.onselectstart = () => false;
   }, [ load ]);

   return (
      <NavContext.Provider value={{ isMinScreen, isOpenMenu: translate, isOpenNav: margin }}>
         {isLoad ? (<><Preloader/><div id='ff'><h1>1</h1><h2>2</h2><h3>3</h3><h4>4</h4></div></>) : (
            <>
               <Logo/>
               <Navbar refLink={navbar}/>

               {!isMinScreen && (
                  <>
                     <div className="presentation" ref={presentation}/>
                     <span className={'resize'} ref={resize}
                           style={{ transform: `translate(${spanPosition}px, -50%)` }}/>
                  </>
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