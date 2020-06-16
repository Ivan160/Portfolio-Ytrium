import React, { FC } from "react";
import style from "./Work.module.scss";

type Props = {
   toggleActive: (value: string) => void
   activeProject: string
   props: Array<{
      title: string,
      description: string,
      image: string,
      myWork: string
   }>
}

const Work: FC<Props> = ({ toggleActive, activeProject, props }) => {
   return (
      <div className={style.wrapper}>

         {
            props.map(({ title, description, image, myWork }, id) => {
               return (
                  <div key={id} className={style.work}>
                     <div className={`${style.wrap} ${!activeProject ? style.open : style.close}`} onClick={() => toggleActive(title)}>
                        <div className={style.more}>More</div>

                        <div className={style.title}>
                           <h1>{title}</h1>
                           <p>- {description}</p>
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