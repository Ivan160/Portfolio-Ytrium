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
      window.addEventListener('resize', onResize);
      document.addEventListener('keydown', esc);
      return () => {
         window.removeEventListener('resize', onResize);
         document.removeEventListener('keydown', esc);
      }
   }, [ onResize, esc ]);

   useEffect(() => {
      document.title = 'Ytrium | Works';
      anime({
         targets: section.current,
         paddingTop: [ '100vh', '0vh' ],
         duration: 1300,
         easing: 'easeInOutQuart'
      });
      onResize();
   }, []);

   type workData = {
      title: string;
      description: string;
      image: string;
      myWork: string
   }[]
   const workData: workData = [
      {
         title: 'Intelecom',
         description: t('works.intelecom.company'),
         image: intelecom,
         myWork: t('works.intelecom.subtitle'),
      },
      {
         title: 'Relax Live',
         description: t('works.relax.company'),
         image: relaxBg,
         myWork: t('works.relax.subtitle'),
      },
      {
         title: 'Tire fitting',
         description: t('works.bus.company'),
         image: busBg,
         myWork: t('works.bus.subtitle')
      },
      {
         title: 'Fitness',
         description: t('works.fitness.company'),
         image: fitnessBg,
         myWork: t('works.fitness.subtitle')
      },
      {
         title: 'Bio',
         description: t('works.bio.company'),
         image: bioBgWork,
         myWork: t('works.bio.subtitle')
      },
      {
         title: '3DGlo',
         description: t('works.dGlo.company'),
         image: dGloBg,
         myWork: t('works.dGlo.subtitle')
      }
   ];

   type projectData = {
      text: { title: string; company: string; subtitle: string; addText: string },
      mainImg: string;
      translateX?: number;
      album: { [key: string]: string[] };
   }[];
   const projectData: projectData = [
      {
         text: {
            title: 'Intelecom',
            company: t('works.intelecom.company'),
            subtitle: t('works.intelecom.subtitle'),
            addText: t('works.intelecom.addText')
         },
         mainImg: intelecom,
         translateX: 50,
         album: int
      },
      {
         text: {
            title: 'Relax Live',
            company: t('works.relax.company'),
            subtitle: t('works.relax.subtitle'),
            addText: t('works.relax.addText')
         },
         mainImg: relaxBg,
         translateX: 45,
         album: rel
      },
      {
         text: {
            title: 'Tire fitting',
            company: t('works.bus.company'),
            subtitle: t('works.bus.subtitle'),
            addText: t('works.bus.addText')
         },
         mainImg: busBg,
         album: bus
      },
      {
         text: {
            title: 'Fitness',
            company: t('works.fitness.company'),
            subtitle: t('works.fitness.subtitle'),
            addText: t('works.fitness.addText')
         },
         mainImg: fitnessBg,
         translateX: 20,
         album: fit
      },
      {
         text: {
            title: 'Bio',
            company: t('works.bio.company'),
            subtitle: t('works.bio.subtitle'),
            addText: t('works.bio.addText')
         },
         mainImg: bioBgProject,
         album: bio
      },
      {
         text: {
            title: '3DGlo',
            company: t('works.dGlo.company'),
            subtitle: t('works.dGlo.subtitle'),
            addText: t('works.dGlo.addText')
         },
         mainImg: dGloBg,
         translateX: 49,
         album: dGlo
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