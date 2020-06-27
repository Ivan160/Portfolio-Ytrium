import React, { FC, useEffect, useRef } from "react";
import style from "./About.module.scss";
import anime from "animejs";
import { useTranslation } from "react-i18next";

type Props = {}

const About: FC<Props> = (props) => {
   const { t } = useTranslation();

   const title = useRef<any>(null);
   const text = useRef<any>(null);

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
         duration: 750,
         delay: anime.stagger(75),
         easing: 'linear'
      });
      anime({
         targets: text.current,
         height: [
            { value: [ 0, text.current.clientHeight ], duration: 1500, delay: 900, easing: 'easeInOutExpo' },
            { value: '100%', duration: 0, delay: 2500, easing: 'linear' },
         ],
         opacity: { value: '1', duration: 0, easing: 'linear' }
      });
   }, []);

   return (
      <section className={style.about}>
         <div className={style.greeting_text}>
            <h1 ref={title}>{t('about.title')}</h1>
            <div ref={text} className={style.text}>
               <p>{t('about.text')}</p>
               <p>{t('about.text')}</p>
               <p>{t('about.text')}</p>
            </div>
         </div>
         <div className={style.image}>

         </div>
      </section>
   );
};
export default About;