import React, { useCallback, useContext, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { NavContext } from "../../../contexts/NavContext";
import anime from "animejs";
import style from "./Skills.module.scss";
import SkillsList from "./SkillsList";

const Skills = () => {
   const { isMinScreen } = useContext(NavContext);
   const { t } = useTranslation();
   const section = useRef<HTMLTableSectionElement>(null);
   const box = useRef<HTMLDivElement>(null);
   const title = useRef<HTMLHeadingElement>(null);
   const text = useRef<HTMLDivElement>(null);
   const fakeBlock = useRef<HTMLDivElement>(null);
   const leftBlock = useRef<HTMLDivElement>(null);

   useEffect(() => {
      document.title = 'Skills | Ytrium';
      const textElem = text.current as HTMLDivElement;
      const titleElem = title.current as HTMLHeadingElement | any;

      anime({
         targets: titleElem,
         opacity: 1,
         easing: 'linear',
         duration: 1
      });
      titleElem.innerHTML = titleElem.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
      anime({
         targets: '.letter',
         rotateY: [ -90, 0 ],
         duration: 400,
         delay: anime.stagger(70),
         easing: 'linear'
      });
      anime({
         targets: textElem,
         height: [
            { value: [ 0, textElem.clientHeight ], duration: 1500, delay: 900, easing: 'easeInOutExpo' },
            { value: '100%', duration: 0, delay: 2500, easing: 'linear' },
         ],
         opacity: { value: '1', duration: 0, easing: 'linear' }
      });

      if (window.innerWidth > 780) {
         anime({
            targets: fakeBlock.current,
            width: [ '100%', '0%' ],
            duration: 2000,
            easing: 'easeInOutQuart'
         });
      }

      anime({
         targets: fakeBlock.current,
         height: [ '100vh', '0vh' ],
         duration: 2000,
         delay: 1350,
         easing: 'easeInOutQuart'
      });

      const timer = setTimeout(() => {
         anime({
            targets: '.load span',
            height: [ '100%', '14%' ],
            duration: 500,
            delay: anime.stagger(50),
            easing: 'easeInOutQuad'
         });
      }, 2500);
      return () => clearTimeout(timer);
   }, []);

   useEffect(() => {
      const leftBlockElem = leftBlock.current as HTMLDivElement;
      if (isMinScreen) {
         anime({
            targets: leftBlockElem,
            height: [ '100vh', '50vh' ],
            duration: 2000,
            delay: 1350,
            easing: 'easeInOutQuart'
         });
      } else leftBlockElem.style.height = '100%';
   }, [ isMinScreen ]);

   const onScroll = useCallback((e: Event) => {
      const boxElem = box.current as HTMLDivElement;
      const target = e.target as HTMLTableSectionElement;
      if (target && box.current) boxElem.style.top = `${target.scrollTop}px`;
   }, []);

   useEffect(() => {
      const sectionElem = section.current as HTMLTableSectionElement;
      sectionElem.addEventListener('scroll', onScroll);
      return () => sectionElem.removeEventListener('scroll', onScroll);
   }, [ onScroll ]);

   return (
      <section ref={section} className={style.skills}>
         <div ref={leftBlock} className={style.left_block}>
            <div ref={box} className={style.box}>
               <div className={style.title}>
                  <h1 ref={title}>{t('skills.title')}</h1>
                  <div ref={text} className={style.text}>
                     <p>{t('skills.textSkills')}</p>
                  </div>
               </div>
            </div>
         </div>

         <div className={style.right_block}>
            <div ref={fakeBlock} className={style.fake_block}/>
            <div className={style.list}>
               <div className={style.descript}>
                  <h3>{t('skills.listSkillsTitle')}</h3>
                  <p>{t('skills.listSkillsDescript')}</p>
               </div>
               <SkillsList data={[
                  { text: 'Frontend', load: .9 },
                  { text: 'Backend', load: .6 },
                  { text: 'Database', load: .8 },
                  { text: 'Design', load: .7 },
                  { text: 'Marketing', load: .7 }
               ]}/>
            </div>
            <div className={style.list}>
               <div className={style.descript}>
                  <h3>{t('skills.listLanguageToolsTitle')}</h3>
                  <p>{t('skills.listLanguageToolsDescript')}</p>
               </div>
               <SkillsList data={[
                  { text: 'HTML', load: 1 },
                  { text: 'CSS/SCSS', load: 1 },
                  { text: 'JavaScript', load: 1 },
                  { text: 'TypeScript', load: .8 },
                  { text: 'Node.js', load: .6 },
                  { text: 'ReactJS', load: .95 },
                  { text: 'JSX/TSX', load: 1 },
                  { text: 'jQuery', load: .9 },
                  { text: 'ExpressJS', load: .8 },
                  { text: 'PHP', load: .4 },
                  { text: 'SQL', load: .9 },
                  { text: 'JSON', load: 1 },
                  { text: 'MongoDB', load: .8 }
               ]}/>
            </div>
            <div className={style.list}>
               <div className={style.descript}>
                  <h3>{t('skills.listSoftwareTitle')}</h3>
                  <p>{t('skills.listSoftwareDescript')}</p>
               </div>
               <SkillsList data={[
                  { text: 'Figma', load: .8 },
                  { text: 'Adobe Photoshop', load: .7 },
                  { text: 'Adobe Illustrator', load: .8 },
                  { text: '1С:Enterprise', load: .8 },
                  { text: 'MS Office', load: 1 }
               ]}/>
            </div>
         </div>
      </section>
   );
};
export default Skills;