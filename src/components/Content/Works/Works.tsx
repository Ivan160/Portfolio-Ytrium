import React, { FC, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import style from "./Works.module.scss";
import Work from './Work/Work';
import { Intelecom } from "./Projects";
import WorksTitle from "./WorksTitle/WorksTitle";
import anime from "animejs";
import intelecom from "../../../assets/images/works/intelecom.png";
import Project from "./Projects/Project";
import { useTranslation } from "react-i18next";
import { NavContext } from "../../../contexts/NavContext";

type data = Array<{
   title: string,
   description: string,
   image: string,
   myWork: string
}>

const Works: FC = () => {
   const { isOpenNav } = useContext(NavContext);
   const { t } = useTranslation();
   const section = useRef<any>(null);
   const works = useRef<any>(null);

   const workData: data = [
      {
         title: 'Intelecom',
         description: 'internet service provider',
         image: intelecom,
         myWork: 'frontend/backend/design'
      },
      {
         title: 'Intelecom1',
         description: 'internet service provider',
         image: intelecom,
         myWork: 'frontend/backend/design'
      },
      {
         title: 'Intelecom2',
         description: 'internet service provider',
         image: intelecom,
         myWork: 'frontend/backend/design'
      }
   ];

   const [ activeProject, setActiveProject ] = useState<string>('');
   const [ isScroll, setScroll ] = useState<boolean>(false);
   const [ position, setPosition ] = useState<number>(0);
   const [ worksTitle, setWorksTitle ] = useState<boolean>(false);

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

   let mTouchStart = 0;
   const touchStart = (event: any) => mTouchStart = event.changedTouches[0].clientY;

   const touchEnd = (event: any) => {
      const mTouchEnd = event.changedTouches[0].clientY;
      const distY = mTouchEnd - mTouchStart;
      if (Math.abs(distY) >= 50) {
         if ((distY > 0) && position - 1 >= 0) setPosition(position - 1);
         else if ((distY < 0) && position + 1 < workData.length) setPosition(position + 1);
      }
   };

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
   }, [ activeProject, isScroll, mouseWheelAndKey ]);

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

   return (
      <section ref={section} className={`${style.works} ${activeProject ? style.active_project : style.active_work}`}>

         {worksTitle && <WorksTitle/>}

         <ul className={style.dots_list}>
            {workData.map(({ title }, id) => (
               <li key={`{${title}_${id}`} className={id === position ? style.active_dot : style.dot}
                   onClick={() => setPosition(id)}/>
            ))}
         </ul>
         <span onClick={() => setActiveProject('')} className={style.btn_close}
               style={{right: `calc(5% + ${isOpenNav ? '62px' : '0'})`}}/>

         <div ref={works} className={style.work}>
            <Work setActiveProject={setActiveProject} activeProject={activeProject}
                  slidePosition={position} data={workData}/>
         </div>

         <div className={style.project_details}>
            {activeProject === 'Intelecom' && <Project text={{
               title: t('works.intelecom.title'),
               company: t('works.intelecom.company'),
               subtitle: t('works.intelecom.subtitle'),
               task: t('works.intelecom.task')
            }} mainImg={intelecom} album={[
               {titleAlbum: 'Dashboard', images: [ intelecom, intelecom, intelecom ]}
            ]}>
               <p>Frontend: <strong>React</strong> + <strong>Redux</strong></p>
               <p>Backend: <strong>Express.js</strong></p>
               <p>Database: <strong>MongoDB</strong> + <strong>mongoose</strong></p>
            </Project>}
            {activeProject === 'Intelecom1' && <Intelecom/>}
            {activeProject === 'Intelecom2' && <Intelecom/>}
         </div>
      </section>
   );
};
export default Works;