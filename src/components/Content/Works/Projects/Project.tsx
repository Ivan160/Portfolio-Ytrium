import React, { FC, useEffect, useState } from "react";
import style from "./Project.module.scss";
import * as int from "../../../../assets/images/works/intelecom";

type Props = {
   children?: React.ReactNode,
   heightImage: number,
   text: {
      company: string,
      title: string,
      subtitle: string,
      task: string,
   },
   mainImg: string,
   album: [ {
      titleAlbum: string,
      images: {[key: string]: string}
   } ]
}

const Project: FC<Props> = ({ children, heightImage, text, mainImg, album }) => {
   const [ extenderAlbum, setExtenderAlbum ] = useState<number>(0);
   useEffect(() => {
      if (extenderAlbum) {
         const album: any = document.getElementById(`album${extenderAlbum}`);
         album.style.height = `${(album.children.length - 1) * (heightImage + 20)}px`
      }
   }, [ extenderAlbum, heightImage ]);

   return (
      <div className={style.project}>
         <div className={style.greeting_zone}>
            <div className={style.text_zone}>
               <p className={style.company}>- {text.company}</p>
               <h1 className={style.title}>{text.title}</h1>
               <h3 className={style.subtitle}>{text.subtitle}</h3>
               <p className={style.task}>{text.task}</p>
               <div className={style.my_work}>
                  {children}
               </div>
            </div>
            <div className={style.main_image}>
               <img src={mainImg} alt='/'/>
            </div>
         </div>
         {
            album.map(({ titleAlbum, images }, id) => {
               const albumId = id + 1;
               return (
                  <div key={`${albumId}`} className={style.album}>
                     <h2>{titleAlbum}</h2>
                     <div id={`album${albumId}`}
                          className={`${style.images} ${extenderAlbum !== albumId ? style.images_limit : ''}`}>
                        {Object.values(images).map((img, id) => (
                           <div key={`${img}_${id}`} className={style.block_image}
                                style={{
                                   top: extenderAlbum === albumId ? `${(heightImage + 20) * id}px` : `${10 * id}px`,
                                   zIndex: 50 - id
                                }}>
                              <img src={img} alt="/"/>
                           </div>
                        ))}
                        <span className={style.extender}
                              onClick={() => extenderAlbum === albumId ? setExtenderAlbum(0) : setExtenderAlbum(albumId)}/>
                     </div>
                  </div>
               )
            })
         }
      </div>
   );
};
export default Project;
