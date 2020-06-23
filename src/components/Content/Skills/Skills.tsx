import React, { FC, useEffect } from "react";
import style from "./Skills.module.scss";
import SkillsList from "./SkillsList";
import { useTranslation } from "react-i18next";
import anime from "animejs";

type Props = {}

const Skills: FC<Props> = (props) => {
   const { t } = useTranslation();

   useEffect(() => {
      // anime({
      //    targets: title.current,
      //    opacity: 1,
      //    easing: 'linear',
      //    duration: 1
      // });
      // // @ts-ignore
      // const letters: Array<any> = text.current.children;
      // for (let i = 0; i < letters.length; i++) letters[i].innerHTML = letters[i].textContent.replace(/\S/g, "<span class='letter'>$&</span>");
      // anime({
      //    targets: '.letter',
      //    rotateY: [ -90, 0 ],
      //    duration: 800,
      //    delay: anime.stagger(70),
      //    easing: 'linear'
      // });

      anime({
         targets: '.load:after',
         width: [ 0, '100%' ],
         duration: 3000,
         delay: anime.stagger(100)
      });

   }, []);

    return (
        <section className={style.skills}>
           <div className={style.left_block}>
              <div className={style.title}>
                 <h1>{t('skills.title')}</h1>
                 <p>{t('skills.textSkills')}</p>
              </div>
              <div className={style.list}>
                 <div className={style.descript}>
                    <h3>{t('skills.listSkillsTitle')}</h3>
                 </div>
                 <SkillsList data={[
                    {text: 'Frontend', load: .9},
                    {text: 'Backend', load: .6},
                    {text: 'Database', load: .8},
                    {text: 'Design', load: .7},
                    {text: 'Marketing', load: .7}
                 ]}/>
              </div>
           </div>

           <div className={style.right_block}>
              <div className={style.list}>
                 <div className={style.descript}>
                    <h3>{t('skills.listLanguageToolsTitle')}</h3>
                    <p>{t('skills.listLanguageToolsDescript')}</p>
                 </div>
                 <SkillsList data={[
                    {text: 'HTML', load: 1},
                    {text: 'CSS/SCSS', load: 1},
                    {text: 'JavaScript', load: 1},
                    {text: 'TypeScript', load: .9},
                    {text: 'NodeJS', load: .6},
                    {text: 'ReactJS', load: 1},
                    {text: 'JSX/TSX', load: 1},
                    {text: 'Jquery', load: .9},
                    {text: 'ExpressJS', load: .8},
                    {text: 'PHP', load: .4},
                    {text: 'SQL', load: .9},
                    {text: 'JSON', load: 1},
                    {text: 'MongoDB', load: .8},
                    {text: 'C++', load: .3}
                 ]}/>
              </div>
           </div>

           {/*<div className={style.list}>*/}
           {/*   <div className={style.descript}>*/}
           {/*      <h3>{t('skills.listSoftwareTitle')}</h3>*/}
           {/*      <p>{t('skills.listSoftwareDescript')}</p>*/}
           {/*   </div>*/}
           {/*   <SkillsList data={[*/}
           {/*      {text: 'Figma', load: .7},*/}
           {/*      {text: 'Adobe photoshop', load: .7},*/}
           {/*      {text: 'Adobe illustrator', load: .8},*/}
           {/*      {text: '1С:Enterprise', load: .8},*/}
           {/*      {text: 'MS Office', load: 1}*/}
           {/*   ]}/>*/}
           {/*</div>*/}
        </section>
    );
};
export default Skills;