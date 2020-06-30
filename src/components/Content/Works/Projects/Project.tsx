import React, { FC, useEffect, useState, useCallback } from "react";
import style from "./Project.module.scss";

type Props = {
   children?: React.ReactNode,
   text: {
      company: string,
      title: string,
      subtitle: string,
      task: string,
   },
   mainImg: string,
   album: [{
      titleAlbum: string,
      images: Array<string>
   }]
}

const Project: FC<Props> = ({ children, text, mainImg, album }) => {
   const [ extender, setExtender ] = useState<number>(0);
   const [ heightImage, setHeightImage ] = useState<number>(450);

   useEffect(() => {
      if (extender) {
         const album: any = document.getElementById(`album${extender}`);
         album.style.height = `${(album.children.length - 1) * (heightImage + 20)}px`
      }
   }, [ extender, heightImage ]);
   
   const onResize = useCallback(() => {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 480) setHeightImage(135);
      else if (screenWidth <= 780) setHeightImage(225);
      else if (screenWidth <= 992) setHeightImage(360);
      else setHeightImage(450);
   }, []);

   useEffect(() => {
      onResize();
      window.addEventListener('resize', onResize);
      return () => window.removeEventListener('resize', onResize);
   }, [ onResize ]);

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
            album.map(({titleAlbum, images}, id) => {
               const albumId = id + 1;
               return (
                  <div  key={`${albumId}`} className={style.album}>
                     <h2>{titleAlbum}</h2>
                     <div id={`album${albumId}`}
                          className={`${style.images} ${extender !== albumId ? style.images_limit : ''}`}>
                        {images.map((img, id) => (
                           <div key={`${img}_${id}`} className={style.block_image}
                                style={{
                                   top: extender === albumId ? `${(heightImage + 20) * id}px` : `${10 * id}px`,
                                   zIndex: 50 - id
                                }}>
                              <img src={img} alt="/"/>
                           </div>
                        ))}
                        <span className={style.extender}
                              onClick={() => extender === albumId ? setExtender(0) : setExtender(albumId)}/>
                     </div>
                  </div>
               )
            })
         }
      </div>
   );
};
export default Project;
