import React, { FC, useCallback, useState } from "react";
import style from "./Project.module.scss";

type Props = {
   heightImage: number,
   activeProject: string,
   data: {
      text: { title: string; company: string; subtitle: string; task: string },
      mainImg: string;
      album: { titleAlbum: string; images: { [key: string]: string } }[];
   }[]
};

const Project: FC<Props> = ({ activeProject, heightImage, data }) => {
   const [ extenderAlbum, setExtenderAlbum ] = useState<string>('');

   const onClick = useCallback((e: React.MouseEvent<HTMLSpanElement>, albumId: string) => {
      let currentAlbum: string = '';
      extenderAlbum !== albumId && (currentAlbum = albumId);
      setExtenderAlbum(currentAlbum);
      const target = e.target as HTMLSpanElement;
      if (currentAlbum && target) {
         const album = target.parentNode as HTMLDivElement;
         album.style.height = `${(album.children.length - 1) * (heightImage + 20)}px`
      }
   }, [ extenderAlbum, heightImage ]);

   return (
      <>
         {
            data.map(({ text, mainImg, album }, projectId) => (
               <div key={`${text.title}_${projectId}`} className={style.project}
                    style={{ display: activeProject === text.title ? 'block' : 'none' }}>
                  <div className={style.greeting_zone}>
                     <div className={style.text_zone}>
                        <p className={style.company}>- {text.company}</p>
                        <h1 className={style.title}>{text.title}</h1>
                        <h3 className={style.subtitle}>{text.subtitle}</h3>
                        <p className={style.task}>{text.task}</p>
                     </div>
                     <div className={style.main_image}>
                        <img src={mainImg} alt='/'/>
                     </div>
                  </div>
                  {
                     album.map(({ titleAlbum, images }, id) => {
                        const albumId = `${text.title}_${titleAlbum}_${id + 1}`;
                        return (
                           <div key={albumId} className={style.album}>
                              <h2>{titleAlbum}</h2>
                              <div className={`${style.images} ${extenderAlbum !== albumId ? style.images_limit : ''}`}>
                                 {Object.values(images).map((img, id) => (
                                    <div key={`${img}_${id}`} className={style.block_image}
                                         style={{
                                            top: extenderAlbum === albumId ? `${(heightImage + 20) * id}px` : `${10 * id}px`,
                                            zIndex: 50 - id
                                         }}>
                                       <img src={img} alt="/"/>
                                    </div>
                                 ))}
                                 <span className={style.extender} onClick={(e) => onClick(e, albumId)}/>
                              </div>
                           </div>
                        )
                     })
                  }
               </div>
            ))
         }
      </>

   );
};
export default Project;
