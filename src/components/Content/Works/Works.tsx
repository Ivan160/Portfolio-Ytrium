import React, { FC, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavContext } from "../../../contexts/NavContext";
import anime from "animejs";
import style from "./Works.module.scss";
import Work from './Work/Work';
import Project from "./Projects/Project";

import intelecom from "../../../assets/images/works/intelecom.png";
import relaxBg from "../../../assets/images/works/relax/relax.png";
import fitnessBg from "../../../assets/images/works/fitness/fitness.png";
import dGloBg from "../../../assets/images/works/dGlo/dGlo.png";
import busBg from "../../../assets/images/works/busservice/bus.png";
import bioBgWork from "../../../assets/images/works/bio/bioWork.png";
import bioBgProject from "../../../assets/images/works/bio/bioProject.png";

import * as int from '../../../assets/images/works/intelecom';
import * as fit from '../../../assets/images/works/fitness';
import * as bio from '../../../assets/images/works/bio';
import * as dGlo from '../../../assets/images/works/dGlo';
import * as rel from '../../../assets/images/works/relax';
import * as bus from '../../../assets/images/works/busservice';

const Works: FC = () => {
   const { t } = useTranslation();
   const { isOpenNav } = useContext(NavContext);
   const section = useRef<any>(null);
   const works = useRef<any>(null);

   const [ heightImage, setHeightImage ] = useState<number>(450);
   const [ activeProject, setActiveProject ] = useState<string>('');
   const [ position, setPosition ] = useState<number>(0);
   const [ isScroll, setScroll ] = useState<boolean>(false);
   const [ mTouchStart, setMTouchStart ] = useState(0);

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
   const touchStart = useCallback((event: any) => setMTouchStart(event.changedTouches[0].clientY), []);
   const touchEnd = useCallback((event: any) => {
      const mTouchEnd = event.changedTouches[0].clientY;
      const distY = mTouchEnd - mTouchStart;
      if (Math.abs(distY) >= 50) {
         if ((distY > 0) && position - 1 >= 0) setPosition(position - 1);
         else if ((distY < 0) && position + 1 < workData.length) setPosition(position + 1);
      }
   }, [ mTouchStart, position ]);

   const onResize = useCallback(() => {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 480) setHeightImage(135);
      else if (screenWidth <= 780) setHeightImage(225);
      else if (screenWidth <= 992) setHeightImage(360);
      else setHeightImage(450);
   }, []);
   const esc = useCallback((e: KeyboardEvent) => e.keyCode === 27 && setActiveProject(''), []);

   useEffect(() => {
      let timeout: NodeJS.Timeout;
      if (activeProject || isScroll) {
         document.removeEventListener('wheel', mouseWheelAndKey, false);
         document.removeEventListener('keyup', mouseWheelAndKey, false);
         document.removeEventListener('touchstart', touchStart, false);
         document.removeEventListener('touchend', touchEnd, false);
         if (isScroll) timeout = setTimeout(() => setScroll(false), 1000);
      } else {
         document.addEventListener('wheel', mouseWheelAndKey, false);
         document.addEventListener('keyup', mouseWheelAndKey, false);
         document.addEventListener('touchstart', touchStart, false);
         document.addEventListener('touchend', touchEnd, false);
      }
      return () => {
         clearTimeout(timeout);
         document.removeEventListener('wheel', mouseWheelAndKey, false);
         document.removeEventListener('keyup', mouseWheelAndKey, false);
         document.removeEventListener('touchstart', touchStart, false);
         document.removeEventListener('touchend', touchEnd, false);
      };
   }, [ activeProject, isScroll, mouseWheelAndKey, touchStart, touchEnd ]);

   useEffect(() => {
      let timeout: NodeJS.Timeout;
      section.current && (section.current.scrollTop = 0)
      if (activeProject && works.current) timeout = setTimeout(() => works.current.style.overflow = 'hidden', 500);
      else works.current.style.overflow = 'initial';
      return () => clearTimeout(timeout)
   }, [ activeProject ]);
   
   useEffect(() => {
      anime({
         targets: section.current,
         paddingTop: [ '100vh', '0vh' ],
         duration: 1300,
         easing: 'easeInOutQuart'
      });
      onResize();
      window.addEventListener('resize', onResize);
      document.addEventListener('keydown', esc);
      return () => {
         window.removeEventListener('resize', onResize);
         document.removeEventListener('keydown', esc);
      }
   }, [ onResize, esc ]);

   type workData = {
      title: string;
      description: string;
      image: string;
      myWork: string
   }[]
   const workData: workData = [
      {
         title: 'Intelecom',
         description: 'internet service provider',
         image: intelecom,
         myWork: 'frontend/backend/design'
      },
      {
         title: 'Fitness',
         description: 'Fitness',
         image: fitnessBg,
         myWork: 'frontend/backend/design'
      },
      {
         title: 'Bio',
         description: 'Bio',
         image: bioBgWork,
         myWork: 'frontend/backend/design'
      },
      {
         title: '3DGlo',
         description: '3DGlo',
         image: dGloBg,
         myWork: 'frontend/backend/design'
      },
      {
         title: 'Relax Live',
         description: 'Relax Live',
         image: relaxBg,
         myWork: 'frontend/backend/design'
      },
      {
         title: 'Tire fitting',
         description: 'Tire fitting',
         image: busBg,
         myWork: 'frontend/backend/design'
      }
   ];

   type projectData = {
      text: { title: string; company: string; subtitle: string; task: string },
      mainImg: string;
      translateX?: number;
      album: { [key: string]: string[] };
   }[];
   const projectData: projectData = [
      {
         text: {
            title: t('works.intelecom.title'),
            company: t('works.intelecom.company'),
            subtitle: t('works.intelecom.subtitle'),
            task: t('works.intelecom.task')
         },
         mainImg: intelecom,
         translateX: 50,
         album: int
      },
      {
         text: {
            title: 'Fitness',
            company: t('works.intelecom.company'),
            subtitle: t('works.intelecom.subtitle'),
            task: t('works.intelecom.task')
         },
         mainImg: fitnessBg,
         translateX: 20,
         album: fit
      },
      {
         text: {
            title: 'Bio',
            company: t('works.intelecom.company'),
            subtitle: t('works.intelecom.subtitle'),
            task: t('works.intelecom.task')
         },
         mainImg: bioBgProject,
         album: bio
      },
      {
         text: {
            title: '3DGlo',
            company: t('works.intelecom.company'),
            subtitle: t('works.intelecom.subtitle'),
            task: t('works.intelecom.task')
         },
         mainImg: dGloBg,
         translateX: 49,
         album: dGlo
      },
      {
         text: {
            title: 'Relax Live',
            company: t('works.intelecom.company'),
            subtitle: t('works.intelecom.subtitle'),
            task: t('works.intelecom.task')
         },
         mainImg: relaxBg,
         translateX: 45,
         album: rel
      },
      {
         text: {
            title: 'Tire fitting',
            company: t('works.intelecom.company'),
            subtitle: t('works.intelecom.subtitle'),
            task: t('works.intelecom.task')
         },
         mainImg: busBg,
         album: bus
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

         <div ref={works} className={style.work}>
            <Work setActiveProject={setActiveProject} activeProject={activeProject}
                  slidePosition={position} data={workData}/>
         </div>

         <div className={style.project_details}>
            <Project activeProject={activeProject} heightImage={heightImage} data={projectData}/>
         </div>
      </section>
   );
};
export default Works;