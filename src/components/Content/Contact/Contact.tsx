import React, { FC, useCallback, useEffect, useRef } from "react";
import style from "./Contact.module.scss";
import anime from "animejs";

type Props = {}

const Contact: FC<Props> = (props) => {
   const areaGrid = useRef<any>(null);

   const grid = useCallback(() => {
      if (!areaGrid.current) return
      const height: number = areaGrid.current.clientHeight;
      const width: number = areaGrid.current.clientWidth;
      const dotSize: number = width / 100 * 3;
      const dotsCountX: number = height / dotSize | 0;
      const dotsCountY: number = width / dotSize | 0;
      const count: number = dotsCountX * dotsCountY;

      const elem: HTMLDivElement = document.createElement('div');
      elem.id = 'grid';
      for (let i = 0; i < count; i++) elem.append(document.createElement('div'));
      areaGrid.current.firstChild.replaceWith(elem);

      anime({
         targets: '#grid div',
         scale: [
            {value: .1, easing: 'easeOutSine', duration: 500},
            {value: 1, easing: 'easeInOutQuad', duration: 1200}
         ],
         //easing: 'easeInOutSine',
         delay: anime.stagger(200, { grid: [ dotsCountX, dotsCountY ], from: 'first' })
      });
   }, []);

   useEffect(() => {
      grid();
      window.addEventListener('resize', grid);
      return () => window.removeEventListener('resize', grid);
   }, [ grid ]);

   return (
      <section>
         <div ref={areaGrid} className='switching'>
            <div id='grid'/>
         </div>
      </section>
   );
};
export default Contact;