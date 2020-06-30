import React, { FC } from "react";
import style from "./Intelecom.module.scss";
import { useTranslation } from "react-i18next";
import intelecom from "../../../../../assets/images/works/intelecom.png";

type Props = {}

const Intelecom: FC<Props> = (props) => {
   const { t } = useTranslation();

   return (
      <div className={style.project}>
         <div className={style.greeting_zone}>
            <div className={style.text_zone}>
               <p className={style.company}>- {t('works.intelecom.company')}</p>
               <h1 className={style.title}>{t('works.intelecom.title')}</h1>
               <h3 className={style.subtitle}>{t('works.intelecom.subtitle')}</h3>
               <p className={style.task}>{t('works.intelecom.task')}</p>
               <div className={style.my_work}>
                  <p>Frontend: <strong>React</strong> + <strong>Redux</strong></p>
                  <p>Backend: <strong>Express.js</strong></p>
                  <p>Database: <strong>MongoDB</strong> + <strong>mongoose</strong></p>
               </div>
            </div>
            <div className={style.image}>
               <img src={intelecom} alt="\"/>
            </div>
         </div>
         <div className={style.presentation}>
             <div className={style.block_image}>
                <img src={intelecom} alt="/"/>
             </div>
            <div className={style.block_image}>
               <img src={intelecom} alt="/"/>
            </div>
            <div className={style.block_image}>
               <img src={intelecom} alt="/"/>
            </div>
         </div>
      </div>
   );
};
export default Intelecom;