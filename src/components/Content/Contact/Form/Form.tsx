import React, { useEffect, useRef, useState } from "react";
import style from "./Form.module.scss";
import { Formik } from 'formik';
import { useTranslation } from "react-i18next";
import emailjs from "emailjs-com";
import Input from "./Input";

const Form = () => {
   const { t } = useTranslation();
   const timeout = useRef<any>(null);
   const [ status, setStatus ] = useState('button');

   useEffect(() => {
      return () => clearTimeout(timeout.current)
   }, []);

   type errors = {
      user_name?: string,
      user_email?: string,
      message?: string
   }

   return (
      <div className={style.form}>
         <Formik
            initialValues={{
               user_name: '',
               user_email: '',
               message: ''
            }}
            validate={(values) => {
               const errors: errors = {};
               if (values.user_name.length < 3) errors.user_name = t('contact.validName');
               if (values.message.length < 10) errors.message = t('contact.validMessage');
               if (!/^[A-Za-z0-9](([_.-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([.-]?[a-zA-Z0-9]+)*)\.([A-Za-z])+$/.test(values.user_email)) errors.user_email = t('contact.validEmail');
               return errors;
            }}
            onSubmit={(values, { setSubmitting, resetForm }) => {
               setStatus('load');
               setSubmitting(true);
               emailjs.send('ytrium', 'template_dJ1Nu7aa', values, 'user_P4ZBOC3rz60KQG3Wo2EeB')
                  .then((result) => {
                     setStatus('success');
                     timeout.current = setTimeout(() => {
                        resetForm();
                        setSubmitting(false);
                        setStatus('button');
                     }, 3000)
                  }, (error) => {
                     setStatus('error');
                     console.log(error.text);
                     timeout.current = setTimeout(() => {
                        setStatus('button');
                        setSubmitting(false);
                     }, 3000)
                  });
            }}
         >
            {({ handleSubmit, isSubmitting, ...methods }) => (
               <form onSubmit={handleSubmit}>
                  <Input name='user_name' label={t('contact.name')} methods={methods}/>
                  <Input name='user_email' label='Email' methods={methods}/>
                  <Input name='message' label={t('contact.message')} component='textarea' methods={methods}/>

                  <button id='submit_button' className={status === 'load' ? style.load :
                     status === 'success' ? style.success : status === 'error' ? style.error : style.button}
                          type="submit" disabled={isSubmitting}>

                     {status === 'success' ? t('contact.success') :
                        status === 'error' ? t('contact.error') : t('contact.submit')}

                  </button>
               </form>
            )}
         </Formik>
      </div>
   );
};
export default Form;