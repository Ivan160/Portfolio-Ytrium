import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import debounce from "lodash.debounce";
import style from "./Works.module.scss";
import Work from './Work/Work';
import intelecom from "../../../assets/images/works/intelecom.png";
import { Intelecom } from "./Projects";
import WorksTitle from "./WorksTitle/WorksTitle";

type data = Array<{
   title: string,
   description: string,
   image: string,
   myWork: string
}>

const Works: FC = () => {
   const section = useRef<any>(null);
   const requestRef = useRef<any>();

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
   const [ slidePosition, setSlidePosition ] = useState<number>(0);
   const [ worksTitle, setWorksTitle ] = useState<boolean>(true);

   const esc = useCallback((e: KeyboardEvent) => e.keyCode === 27 && setActiveProject(''), []);

   useEffect(() => {
      document.addEventListener('keydown', esc);
      return () => document.removeEventListener('keydown', esc);
   }, [ esc ]);

   const scrolling = useCallback((scrollTop: number, position: number) => {
      const duration: number = 1250;
      const start = performance.now();

      const easeInOutQuart = (x: number): number =>  x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
      const animate = (time: number) => {
         let timeFraction = (time - start) / duration;
         if (timeFraction > 1) timeFraction = 1;
         const progress = easeInOutQuart(timeFraction);
         if (section.current) section.current.scrollTop = scrollTop + position * progress;
         if (timeFraction < 1) requestRef.current = requestAnimationFrame(animate);
         else cancelAnimationFrame(requestRef.current);
      }
      requestAnimationFrame(animate);
   }, []);

   const onScroll = useCallback(debounce((e: any) => {
      if (!e.target) return;
      const scrollTop = e.target.scrollTop;
      const clientHeight = e.target.clientHeight;
      //    const newSlide: number = Math.round(scrollTop / clientHeight);
      const currentSlide: number = Math.round(scrollTop / clientHeight);
      const differSlide: number = Math.sign(scrollTop / clientHeight - currentSlide);
      const newSlide: number = Math.round(currentSlide + differSlide);
      const newSlideScroll: number = newSlide * clientHeight;
      const remainsScroll: number = newSlideScroll - scrollTop;

      if (remainsScroll !== 0) {
         scrolling(scrollTop, remainsScroll);
         setSlidePosition(newSlide);
      }
   }, 50, { 'leading': true, 'trailing': false }), [ scrolling ]);

   useEffect(() => {
      !activeProject ? section.current.addEventListener('scroll', onScroll) : section.current.removeEventListener('scroll', onScroll);
      return () => {
         cancelAnimationFrame(requestRef.current);
         section.current.removeEventListener('scroll', onScroll);
      };
   }, [ onScroll, scrolling, activeProject ]);

   useEffect(() => {
      const timeoutOne: NodeJS.Timeout = setTimeout(() => scrolling(0, section.current.clientHeight), 2200);
      const timeoutTwo: NodeJS.Timeout = setTimeout(() => setWorksTitle(false), 4200);
      return () => {
         clearTimeout(timeoutOne);
         clearTimeout(timeoutTwo);
      }
   }, [ scrolling ]);

   useMemo(() => section.current && !activeProject ? scrolling(slidePosition * section.current.clientHeight, 0) : scrolling(0, 0), [ activeProject, scrolling ]);

   return (
      <section ref={section} className={style.works}
               style={{ backgroundColor: `${activeProject ? '#D9D9E5' : 'transparent'}` }}>

         {worksTitle && <WorksTitle/>}

         <div className={`${style.work} ${activeProject ? style.work_hidden : style.work_visible}`}>
            <Work setActiveProject={setActiveProject} activeProject={activeProject}
                  slidePosition={slidePosition} data={data}/>
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