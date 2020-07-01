import React, { FC, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavContext } from "../../../contexts/NavContext";
import anime from "animejs";
import style from "./Works.module.scss";
import Work from './Work/Work';
import Project from "./Projects/Project";
import intelecom from "../../../assets/images/works/intelecom.png";

const Works: FC = () => {
   const { t } = useTranslation();
   const { isOpenNav } = useContext(NavContext);
   const section = useRef<any>(null);
   const works = useRef<any>(null);
   const fakeBlock = useRef<any>(null);

   const [ heightImage, setHeightImage ] = useState<number>(450);
   const [ activeProject, setActiveProject ] = useState<string>('');
   const [ isScroll, setScroll ] = useState<boolean>(false);
   const [ position, setPosition ] = useState<number>(-1);

   const esc = useCallback((e: KeyboardEvent) => e.keyCode === 27 && setActiveProject(''), []);
   useEffect(() => {
      document.addEventListener('keydown', esc);
      return () => document.removeEventListener('keydown', esc);
   }, [ esc ]);

   useMemo(() => {
      if (!works.current) return;
      setScroll(true);
      const positionY = position * 100;

      anime({
         targets: works.current,
         translateY: `-${positionY}%`,
         duration: 1250,
         easing: 'easeInOutQuart'
      });
   }, [ position ])

   const mouseWheelAndKey = useCallback((event: any) => {
      if ((event.deltaY > 0 || event.keyCode === 40) && position + 1 < workData.length) setPosition(position + 1);
      else if ((event.deltaY < 0 || event.keyCode === 38) && position - 1 >= 0) setPosition(position - 1);
   }, [ position ]);

   const [ mTouchStart, setMTouchStart ] = useState(0);
   const touchStart = useCallback((event: any) => setMTouchStart(event.changedTouches[0].clientY), []);
   const touchEnd = useCallback((event: any) => {
      const mTouchEnd = event.changedTouches[0].clientY;
      const distY = mTouchEnd - mTouchStart;
      if (Math.abs(distY) >= 50) {
         if ((distY > 0) && position - 1 >= 0) setPosition(position - 1);
         else if ((distY < 0) && position + 1 < workData.length) setPosition(position + 1);
      }
   }, [ mTouchStart, position ]);

   useEffect(() => {
      if (activeProject || isScroll) {
         document.removeEventListener('wheel', mouseWheelAndKey, false);
         document.removeEventListener('keyup', mouseWheelAndKey, false);
         document.removeEventListener('touchstart', touchStart, false);
         document.removeEventListener('touchend', touchEnd, false);
      } else {
         document.addEventListener('wheel', mouseWheelAndKey, false);
         document.addEventListener('keyup', mouseWheelAndKey, false);
         document.addEventListener('touchstart', touchStart, false);
         document.addEventListener('touchend', touchEnd, false);
      }
      return () => {
         document.removeEventListener('wheel', mouseWheelAndKey, false);
         document.removeEventListener('keyup', mouseWheelAndKey, false);
         document.removeEventListener('touchstart', touchStart, false);
         document.removeEventListener('touchend', touchEnd, false);
      };
   }, [ activeProject, isScroll, mouseWheelAndKey, touchStart, touchEnd ]);

   useEffect(() => {
      const timeout = setTimeout(() => setScroll(false), 1000);
      return () => clearTimeout(timeout)
   }, [ isScroll ]);

   useEffect(() => {
      let timeout: NodeJS.Timeout;
      section.current && (section.current.scrollTop = 0)
      if (activeProject && works.current) timeout = setTimeout(() => works.current.style.overflow = 'hidden', 500);
      else works.current.style.overflow = 'initial';
      return () => clearTimeout(timeout)
   }, [ activeProject ]);

   const onResize = useCallback(() => {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 480) setHeightImage(135);
      else if (screenWidth <= 780) setHeightImage(225);
      else if (screenWidth <= 992) setHeightImage(360);
      else setHeightImage(450);
   }, []);

   useEffect(() => {
      onResize();
      window.addEventListener('resize', onResize);
      return () => window.removeEventListener('resize', onResize);
   }, [ onResize ]);

   useEffect(() => {
      anime({
         targets: fakeBlock.current,
         height: [ '100vh', '0vh' ],
         duration: 1300,
         easing: 'easeInOutQuart'
      });
      const timeout = setTimeout(() => setPosition(0), 350);
      return () => clearTimeout(timeout)
   }, []);

   type data = Array<{
      title: string,
      description: string,
      image: string,
      myWork: string
   }>
   const workData: data = [
      {
         title: 'Intelecom',
         description: 'internet service provider',
         image: intelecom,
         myWork: 'frontend/backend/design'
      }
   ];

   return (
      <section ref={section} className={`${style.works} ${activeProject ? style.active_project : style.active_work}`}>
         <ul className={style.dots_list}>
            {workData.map(({ title }, id) => (
               <li key={`{${title}_${id}`} className={id === position ? style.active_dot : style.dot}
                   onClick={() => setPosition(id)}/>
            ))}
         </ul>
         <span onClick={() => setActiveProject('')} className={style.btn_close}
               style={{ right: `calc(5% + ${isOpenNav ? 62 : 0}px)` }}/>
         <div ref={fakeBlock} className={style.fake_block}/>
         <div ref={works} className={style.work}>
            <Work setActiveProject={setActiveProject} activeProject={activeProject}
                  slidePosition={position} data={workData}/>
         </div>

         <div className={style.project_details}>
            {activeProject === 'Intelecom' && <Project heightImage={heightImage} text={{
               title: t('works.intelecom.title'),
               company: t('works.intelecom.company'),
               subtitle: t('works.intelecom.subtitle'),
               task: t('works.intelecom.task')
            }} mainImg={intelecom} album={[
               { titleAlbum: 'Dashboard', images: [ intelecom, intelecom, intelecom ] }
            ]}>
               <p>Frontend: <strong>React</strong> + <strong>Redux</strong></p>
               <p>Backend: <strong>Express.js</strong></p>
               <p>Database: <strong>MongoDB</strong> + <strong>mongoose</strong></p>
            </Project>}
         </div>
      </section>
   );
};
export default Works;