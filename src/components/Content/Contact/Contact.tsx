import React, { FC, useEffect, useRef, useState } from "react";
import emailjs from 'emailjs-com';
import style from "./Contact.module.scss";
import { useTranslation } from "react-i18next";
import anime from "animejs";

type Props = {}

const Contact: FC<Props> = (props) => {
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

   const [ data, setData ] = useState({
      user_name: '',
      user_email: '',
      message: ''
   });

   const submitForm = (e: any) => {
      e.preventDefault();
      emailjs.send('ytrium', 'template_dJ1Nu7aa', data, 'user_P4ZBOC3rz60KQG3Wo2EeB')
         .then((result) => {
            console.log(result.text);
         }, (error) => {
            console.log(error.text);
         });
   };

   const handleChange = (e: any) => setData({ ...data, [e.target.name]: e.target.value });

   return (
      <section className={style.contact}>
         <div className={style.title}>
            <h1 ref={title}>{t('contact.title')}</h1>
            <div ref={text} className={style.text}>
               <p>{t('contact.textContact')}</p>
            </div>
         </div>

         <div className={style.form}>
            <form onSubmit={submitForm} autoComplete="off">
               <div className={style.input_box}>
                  <input type="text" name="user_name" required
                         value={data.user_name} onChange={handleChange}/>
                  <label>{t('contact.name')}</label>
               </div>
               <div className={style.input_box}>
                  <input type="email" name="user_email" required
                         value={data.user_email} onChange={handleChange}/>
                  <label>Email</label>
               </div>
               <div className={style.input_box}>
                  <textarea name="message" required
                            value={data.message} onChange={handleChange}/>
                  <label>{t('contact.message')}</label>
               </div>
               <button type="submit">{t('contact.submit')}</button>
            </form>
         </div>
      </section>
   );
};
export default Contact;