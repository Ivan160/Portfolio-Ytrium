import React, { useEffect, useRef } from "react";
import style from "./Contact.module.scss";
import { useTranslation } from "react-i18next";
import anime from "animejs";
import Form from "./Form/Form";


const Contact = () => {
   const { t } = useTranslation();
   const title = useRef<any>(null);
   const text = useRef<any>(null);

   useEffect(() => {
      anime({
         targets: title.current,
         opacity: 1,
         easing: 'linear',
         duration: 0
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
         height: [
            { value: [ 0, text.current.clientHeight ], duration: 1500, delay: 900, easing: 'easeInOutExpo' },
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
         opacity: [0, 1],
         delay: 1200,
         duration: 600,
         easing: 'easeInOutExpo'
      });

      anime({
         targets: '#submit_button',
         opacity: [0, 1],
         translateY: ['-50%', 0],
         delay: 1300,
         duration: 800,
         easing: 'easeInOutExpo'
      });
   }, []);

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

         </div>
      </section>
   );
};
export default Contact;