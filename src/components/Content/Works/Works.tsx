import React, { FC } from "react";
import style from "./Works.module.scss";
import intelecom from "../../../assets/images/works/intelecom.png";

type Props = {}

const Works: FC<Props> = (props) => {
   return (
      <section className={style.works}>
         <div className={style.wrap}>
            <div className={style.box}>
               <div className={style.more}>More</div>
               <div className={style.image}>
                  <img src={intelecom} alt="intelecom"/>
                  <div className={style.my_work}>
                     <p>frontend/backend/design</p>
                  </div>
               </div>
            </div>
            <div className={style.title}>
               <h1>Intelecom</h1>
               <p>- internet service provider</p>
            </div>
         </div>
      </section>
   );
};
export default Works;