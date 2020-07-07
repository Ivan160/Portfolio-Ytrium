import React, { useEffect, useRef } from "react";
import style from "./Contact.module.scss";
import { useTranslation } from "react-i18next";
import anime from "animejs";
import Form from "./Form/Form";

const Contact = () => {
   const { t } = useTranslation();
   const title = useRef<HTMLHeadingElement>(null);
   const text = useRef<HTMLDivElement>(null);
   const beforeBlock = useRef<HTMLDivElement>(null);
   const line = useRef<HTMLSpanElement>(null);

   useEffect(() => {
      document.title = 'Contact | Ytrium';
      const titleElem = title.current as HTMLHeadingElement | any;
      const textElem = text.current as HTMLDivElement;

      anime({
         targets: titleElem,
         opacity: 1,
         easing: 'linear',
         duration: 0
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
            { value: '100%', duration: 0, delay: 2700, easing: 'linear' },
         ],
         opacity: { value: '1', duration: 0, easing: 'linear' }
      });

      anime({
         targets: '#span_border',
         width: { value: '100%', easing: 'easeInOutExpo', delay: 400, duration: 1250 },
         backgroundColor: '#D9D9E5'
      });

      anime({
         targets: '#label_field',
         opacity: [ 0, 1 ],
         delay: 1200,
         duration: 600,
         easing: 'easeInOutExpo'
      });

      anime({
         targets: '#submit_button',
         opacity: [ 0, 1 ],
         translateY: [ '-50%', 0 ],
         delay: 1300,
         duration: 800,
         easing: 'easeInOutExpo'
      });

      if (window.innerWidth > 780) {
         anime({
            targets: beforeBlock.current,
            height: { value: [ '100%', '45vw' ], easing: 'easeInOutExpo', delay: 2000, duration: 2000 },
            borderRadius: { value: [ 0, '100% 0 0 100%' ], easing: 'easeInOutExpo', delay: 2000, duration: 2000 },
            opacity: { value: 1, easing: 'linear', delay: 1800, duration: 10 }
         });
      }

      anime({
         targets: beforeBlock.current,
         height: { value: [ '100%', '45vw' ], easing: 'easeInOutExpo', delay: 1700, duration: 2000 },
         borderRadius: { value: [ 0, '100% 0 0 100%' ], easing: 'easeInOutExpo', delay: 1700, duration: 2000 },
         translateX: { value: '55%', easing: 'linear', duration: 10 },
         translateY: { value: [ '-150', '-50%' ], easing: 'easeInOutExpo', duration: 4000 }
      });

      anime({
         targets: line.current,
         width: [ 0, '33%' ],
         delay: 3000,
         duration: 600,
         easing: 'linear'
      });

      anime({
         targets: [ '#link_network', '#email' ],
         opacity: [ 0, 1 ],
         translateY: [ '50%', 0 ],
         delay: 3000,
         duration: 600,
         easing: 'linear'
      });
   }, []);

   const onClick = (e: React.MouseEvent<HTMLParagraphElement>) => {
      const target = e.target as HTMLParagraphElement | any;
      if (target) {
         e.preventDefault();
         const range = document.createRange();
         range.selectNode(target);
         // @ts-ignore
         window.getSelection().addRange(range);
         document.execCommand('copy');
         // @ts-ignore
         window.getSelection().removeAllRanges();
         const elem = target.nextElementSibling;
         anime({
            targets: elem,
            opacity: [ { value: .9,  duration: 400 }, { value: 0, delay: 250, duration: 400 } ],
            translateY: [ { value: [ '-50%', '-120%' ], duration: 300 }, { value: '-170%', delay: 350, duration: 300 } ],
            easing: 'linear'
         });
      }
   };

   return (
      <section className={style.contact}>
         <div className={style.left_block}>
            <div className={style.title}>
               <h1 ref={title}>{t('contact.title')}</h1>
               <div ref={text} className={style.text}>
                  <p>{t('contact.textContact')}</p>
               </div>
            </div>
            <Form/>
         </div>
         <div className={style.right_block}>
            <div ref={beforeBlock} className={style.before_block}/>
            <div id='email' className={style.email}>
               <p onClick={onClick}>ivanandrosc@gmail.com</p>
               <span className={style.copy}>copy</span>
            </div>
            <span ref={line} className={style.line}/>
            <div className={style.network} id='link_network'>
               <a href='https://www.linkedin.com/in/ivanandrosc/' target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                     <path d="M8.94531 12.5H0V40H8.94531V12.5Z"/>
                     <path d="M33.3125 12.8203C33.2187 12.7891 33.125 12.7578 33.0312 12.7266C32.9141 12.6953 32.7891 12.6797 32.6719 12.6563C32.1953 12.5625 31.6797 12.4922 31.0703 12.4922C25.8516 12.4922 22.5469 16.2812 21.4609 17.75V12.5H12.5V40H21.4453V25C21.4453 25 28.2031 15.5859 31.0547 22.5C31.0547 28.6719 31.0547 40 31.0547 40H40V21.4453C40 17.2891 37.1562 13.8281 33.3125 12.8203Z"/>
                     <path d="M4.375 8.75C6.79125 8.75 8.75 6.79125 8.75 4.375C8.75 1.95875 6.79125 0 4.375 0C1.95875 0 0 1.95875 0 4.375C0 6.79125 1.95875 8.75 4.375 8.75Z"/>
                  </svg>
               </a>
               <a href='https://github.com/Ivan160' target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 40 39" xmlns="http://www.w3.org/2000/svg">
                     <path d="M20 0C8.95313 0 0 8.94926 0 19.9967C0 28.8268 5.72656 36.3216 13.6719 38.9603C14.6719 39.151 15.0391 38.5311 15.0391 37.9986C15.0391 37.5217 15.0234 36.2659 15.0156 34.5969C9.45312 35.805 8.28125 31.9185 8.28125 31.9185C7.375 29.6136 6.05469 28.9937 6.05469 28.9937C4.24219 27.7538 6.19531 27.7777 6.19531 27.7777C8.20313 27.9128 9.25781 29.8361 9.25781 29.8361C11.0391 32.8961 13.9375 32.0059 15.0859 31.4972C15.2656 30.2017 15.7813 29.3275 16.3516 28.8268C11.9063 28.3261 7.24219 26.6093 7.24219 18.9476C7.24219 16.762 8.01563 14.9817 9.29688 13.5828C9.07031 13.0742 8.39844 11.0475 9.46875 8.28959C9.46875 8.28959 11.1406 7.75708 14.9688 10.3401C16.5703 9.89505 18.2656 9.67251 19.9688 9.66456C21.6719 9.67251 23.3672 9.89505 24.9688 10.3401C28.7656 7.75708 30.4453 8.28959 30.4453 8.28959C31.5234 11.0395 30.8437 13.0742 30.6484 13.5828C31.9219 14.9817 32.6953 16.762 32.6953 18.9476C32.6953 26.6252 28.0234 28.3181 23.5703 28.8109C24.2734 29.4149 24.9219 30.6389 24.9219 32.5066C24.9219 35.185 24.8984 37.331 24.8984 37.9827C24.8984 38.5072 25.25 39.1351 26.2734 38.9285C34.2734 36.3136 40 28.8188 40 19.9967C40 8.94926 31.0469 0 20 0Z"/>
                  </svg>
               </a>
               <a href='https://hh.ru/resume/7c615d03ff081d03980039ed1f4472716f4e68' target="_blank" rel="noopener noreferrer">
                  <svg className={style.hh} viewBox="0 0 47 36" xmlns="http://www.w3.org/2000/svg">
                     <path d="M6.37076 0V13.5145C8.41628 11.0559 10.8834 9.83445 13.7252 9.83445C15.193 9.83445 16.5047 10.1163 17.6914 10.6801C18.8781 11.2282 19.7525 11.9485 20.3615 12.8098C20.9548 13.6868 21.3764 14.6421 21.5794 15.6913C21.798 16.7405 21.9073 18.3691 21.9073 20.5772V35.0157H15.5365V22.0022C15.5365 19.4183 15.4272 17.7897 15.1774 17.085C14.9276 16.3803 14.506 15.8322 13.897 15.4251C13.288 15.0179 12.5229 14.7987 11.6017 14.7987C10.5399 14.7987 9.60299 15.0649 8.77542 15.5973C7.93223 16.1297 7.33887 16.9127 6.94851 17.9776C6.55814 19.0425 6.37076 20.5928 6.37076 22.6756V35.0157H0V0H6.37076Z"/>
                     <path d="M31.4635 0V13.5145C33.5091 11.0559 35.9762 9.83445 38.818 9.83445C40.2858 9.83445 41.5974 10.1163 42.7842 10.6801C43.9553 11.2282 44.8453 11.9485 45.4386 12.8098C46.032 13.6868 46.4536 14.6421 46.6722 15.6913C46.8908 16.7405 47.0001 18.3691 47.0001 20.5772V35.0157H40.6293V22.0022C40.6293 19.4183 40.5044 17.7897 40.2702 17.085C40.0204 16.3803 39.5988 15.8322 38.9898 15.4251C38.3808 15.0179 37.6157 14.7987 36.6944 14.7987C35.6327 14.7987 34.6958 15.0649 33.8682 15.5973C33.0406 16.1297 32.4317 16.9127 32.0413 17.9776C31.6665 19.0425 31.4635 20.5928 31.4635 22.6756V35.0157H25.0928V0H31.4635Z"/>
                  </svg>
               </a>
            </div>
         </div>
      </section>
   );
};
export default Contact;