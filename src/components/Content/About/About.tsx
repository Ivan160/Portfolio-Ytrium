import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import anime from "animejs";
import style from "./About.module.scss";
import LinkPage from "../../Common/LinkPage";
import myPhoto from "../../../assets/images/about/myPhoto.jpg";

const About = () => {
   const { t } = useTranslation();
   const photo = useRef<HTMLImageElement>(null);
   const title = useRef<HTMLHeadingElement>(null);
   const nameIs = useRef<HTMLParagraphElement>(null);
   const line = useRef<HTMLSpanElement>(null);
   const textOne = useRef<HTMLHeadingElement>(null);
   const textTwo = useRef<HTMLParagraphElement>(null);

   useEffect(() => {
      document.title = 'About | Ytrium';
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
         targets: nameIs.current,
         opacity: 1,
         delay: 100,
         duration: 400,
         easing: 'linear'
      });

      anime({
         targets: line.current,
         width: [ 0, '33%' ],
         delay: 500,
         duration: 500,
         easing: 'linear'
      });

      anime({
         targets: [ textOne.current, textTwo.current ],
         opacity: { value: 1, duration: 300 },
         translateY: [ '10%', 0 ],
         delay: 1000,
         duration: 400,
         easing: 'linear'
      });

      anime({
         targets: photo.current,
         opacity: 1,
         delay: 1000,
         duration: 1000,
         easing: 'linear'
      });
   }, []);

   return (
      <section className={style.about}>
         <div className={style.greeting_text}>
            <div className={style.title}>
               <p ref={nameIs}>{t('about.title.nameIs')}</p>
               <h1 ref={title}>{t('about.title.name')}</h1>
               <span ref={line} className={style.line}/>
            </div>
            <div className={style.text}>
               <h4 ref={textOne}>{t('about.text.title')}</h4>
               <p ref={textTwo}>&mdash;   {t('about.text.text')}</p>
            </div>
         </div>
         <div className={style.image}>
            <img ref={photo} src={myPhoto} alt=""/>
         </div>
         <LinkPage links={[ 'works' ]}/>
      </section>
   );
};
export default About;