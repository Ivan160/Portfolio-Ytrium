import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import style from "./Works.module.scss";
import Work from './Work/Work';
import intelecom from "../../../assets/images/works/intelecom.png";
import { Intelecom } from "./Projects";
import WorksTitle from "./WorksTitle/WorksTitle";
import anime from "animejs";

type data = Array<{
   title: string,
   description: string,
   image: string,
   myWork: string
}>

const Works: FC = () => {
   const section = useRef<any>(null);
   const works = useRef<any>(null);

   const data: data = [
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
      },
      {
         title: 'Intelecom3',
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
      const positionY = position * 100;

      anime({
         targets: works.current,
         translateY: `-${positionY}%`,
         duration: 1250,
         easing: 'easeInOutQuart'
      });
   }, [ position ])


   const mouseWheelAndKey = useCallback((event: any) => {
      setScroll(true);
      if ((event.deltaY > 0 || event.keyCode === 40) && position + 1 < data.length) setPosition(position + 1);
      else if ((event.deltaY < 0 || event.keyCode === 38) && position - 1 >= 0) setPosition(position - 1);
   }, [ position ]);


   let mTouchStart = 0;
   const touchStart = (event: any) => {
      console.log(1);
      mTouchStart = parseInt(event.changedTouches[0].clientY);
   }

   const touchEnd = useCallback((event: any) => {
      setScroll(true);
      console.log(2);
      const mTouchEnd = parseInt(event.changedTouches[0].clientY)
      if (mTouchEnd - mTouchStart > 100 || mTouchStart - mTouchEnd > 100) {
         if ((mTouchEnd > mTouchStart) && position - 1 >= 0) setPosition(position - 1);
         else if ((mTouchEnd < mTouchStart) && position + 1 < data.length) setPosition(position + 1);
      }
   }, [mTouchStart]);

   useEffect(() => {
      if (activeProject || isScroll) {
         document.removeEventListener('wheel', mouseWheelAndKey);
         document.removeEventListener('keyup', mouseWheelAndKey);
         document.removeEventListener('touchstart', touchStart);
         document.removeEventListener('touchend', touchEnd);
      } else {
         document.addEventListener('wheel', mouseWheelAndKey);
         document.addEventListener('keyup', mouseWheelAndKey);
         document.addEventListener('touchstart', touchStart);
         document.addEventListener('touchend', touchEnd);
      }
      return () => {
         document.removeEventListener('wheel', mouseWheelAndKey);
         document.removeEventListener('keyup', mouseWheelAndKey);
      };
   }, [ activeProject, isScroll, mouseWheelAndKey ]);

   useEffect(() => {
      const timeout = setTimeout(() => setScroll(false), 1000);
      return () => clearTimeout(timeout)
   }, [ isScroll ]);

   useMemo(() => section.current && (section.current.scrollTop = 0), [ activeProject ]);

   return (
      <section ref={section} className={style.works}
               style={{
                  backgroundColor: activeProject ? '#D9D9E5' : 'transparent',
                  overflowY: !activeProject ? 'hidden' : 'scroll'
               }}>

         {worksTitle && <WorksTitle/>}

         <ul className={style.dots_list}>
            {
               data.map(({ title }, id) => (
                  <li key={`{${title}_${id}`} style={{ width: id === position ? '100%' : '75%' }}
                      onClick={() => setPosition(id)}/>
               ))
            }
         </ul>

         <div ref={works} className={`${style.work} ${activeProject ? style.work_hidden : style.work_visible}`}>
            <Work setActiveProject={setActiveProject} activeProject={activeProject}
                  slidePosition={position} data={data}/>
         </div>

         <div className={style.project_details}>
            {activeProject === 'Intelecom' && <Intelecom/>}
            {activeProject === 'Intelecom1' && <Intelecom/>}
            {activeProject === 'Intelecom2' && <Intelecom/>}
         </div>
      </section>
   );
};
export default Works;