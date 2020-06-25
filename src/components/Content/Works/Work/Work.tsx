import React, { FC } from "react";
import style from "./Work.module.scss";
import { useTranslation } from "react-i18next";

type Props = {
   setActiveProject: (value: string) => void
   activeProject: string
   slidePosition: number
   data: Array<{
      title: string,
      description: string,
      image: string,
      myWork: string
   }>
}

const Work: FC<Props> = ({ setActiveProject, activeProject,slidePosition, data }) => {
   const { t } = useTranslation();

   return (
      <div className={style.wrapper}>
         {
            data.map(({ title, description, image, myWork }, id) => {
               return (
                  <div key={`${title}_${id}`} className={style.work} style={{display: activeProject !== '' ? activeProject === title ? 'flex' : 'none' : 'flex'}}>
                     <div className={`${style.wrap} ${!activeProject ? style.open : style.close}`} onClick={() => setActiveProject(title)}>
                        <div className={style.more}>{t('works.more')}</div>

                        <div className={`${style.title_block} ${slidePosition === id ? style.active_block : ''}`}>
                           <div className={style.title}>
                              <h1>{title}</h1>
                           </div>
                           <div className={style.description}>
                              <p>- {description}</p>
                           </div>
                        </div>

                        <div className={style.image}>
                           <img src={image} alt="/"/>
                        </div>

                        <div className={style.myWork}>
                           <p>{myWork}</p>
                        </div>
                     </div>
                  </div>
               );
            })
         }
      </div>
   );
};
export default Work;