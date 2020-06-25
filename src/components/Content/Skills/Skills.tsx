import React, { FC, useCallback, useEffect, useRef } from "react";
import style from "./Skills.module.scss";
import SkillsList from "./SkillsList";
import { useTranslation } from "react-i18next";
import anime from "animejs";

type Props = {}

const Skills: FC<Props> = (props) => {
   const { t } = useTranslation();
   const section = useRef<any>(null);
   const box = useRef<any>(null);
   const title = useRef<any>(null);
   const text = useRef<any>(null);
   const fakeBlock = useRef<any>(null);

   useEffect(() => {
      anime({
         targets: title.current,
         opacity: 1,
         easing: 'linear',
         duration: 1
      });

      title.current.innerHTML = title.current.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
      anime({
         targets: '.letter',
         rotateY: [ -90, 0 ],
         duration: 400,
         delay: anime.stagger(70),
         easing: 'linear'
      });

      anime({
         targets: text.current,
         height: [ 0, text.current.clientHeight ],
         duration: 1500,
         delay: 900,
         easing: 'easeInOutExpo'
      });

      anime({
         targets: fakeBlock.current,
         width: [ '100%', '0%' ],
         duration: 2000,
         easing: 'easeInOutQuart'
      });

      anime({
         targets: fakeBlock.current,
         height: [ '100vh', '0vh' ],
         duration: 2000,
         delay: 1350,
         easing: 'easeInOutQuart'
      });

      const timer = setTimeout(() => {
         anime({
            targets: text.current,
            height: '100%',
            duration: 0,
            easing: 'linear',
            delay: 2500
         });
      }, 2500);
      return () => clearTimeout(timer);
   }, []);

   const onScroll = useCallback((e: any) => {
      if (!e.target && !box.current) return;
      box.current.style.top = `${e.target.scrollTop}px`;
   }, []);

   useEffect(() => {
      section.current.addEventListener('scroll', onScroll);
      return () => section.current.removeEventListener('scroll', onScroll);
   }, [ onScroll ]);

   return (
      <section ref={section} className={style.skills}>
         <div className={style.left_block}>
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
                  { text: 'TypeScript', load: .9 },
                  { text: 'NodeJS', load: .6 },
                  { text: 'ReactJS', load: .95 },
                  { text: 'JSX/TSX', load: 1 },
                  { text: 'Jquery', load: .9 },
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
                  { text: 'Figma', load: .7 },
                  { text: 'Adobe photoshop', load: .7 },
                  { text: 'Adobe illustrator', load: .8 },
                  { text: '1С:Enterprise', load: .8 },
                  { text: 'MS Office', load: 1 }
               ]}/>
            </div>
         </div>
      </section>
   );
};
export default Skills;