import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import style from "./Works.module.scss";
import Work from './Work/Work';
import intelecom from "../../../assets/images/works/intelecom.png";
import { Intelecom } from "./Projects";

const Works: FC = () => {
   const section = useRef<any>(null);
   const [ activeProject, setActiveProject ] = useState<string>('');

   const toggleActive = useCallback((work: string) => activeProject ? setActiveProject('') : setActiveProject(work), [ activeProject ]);
   const esc = useCallback((e: KeyboardEvent) => e.keyCode === 27 && toggleActive(''), [ toggleActive ]);

   useEffect(() => {
      document.addEventListener('keydown', esc);
      return () => document.removeEventListener('keydown', esc);
   }, [ esc ]);


   const scroll = useCallback((e: Event) => {
      console.log(window.pageYOffset);
   }, [  ]);

   useEffect(() => {
      section.current.addEventListener('scroll', scroll);
      return () =>  section.current.removeEventListener('scroll', scroll);
   }, [ scroll ]);

   return (
      <section ref={section} className={style.works} style={{ backgroundColor: `${activeProject ? '#D9D9E5' : 'transparent'}` }}>
         <div className={`${style.projects} ${activeProject ? style.projects_hidden : style.projects_visible}`}>
            <Work toggleActive={toggleActive} activeProject={activeProject}
                  props={[
                     {
                        title: 'Intelecom',
                        description: 'internet service provider',
                        image: intelecom,
                        myWork: 'frontend/backend/design'
                     },
                     {
                        title: 'Intelecom',
                        description: 'internet service provider',
                        image: intelecom,
                        myWork: 'frontend/backend/design'
                     }
                  ]}
            />
         </div>

         <div className={style.project_details}>
            {activeProject === 'Intelecom' && <Intelecom/>}
         </div>
      </section>
   );
};
export default Works;