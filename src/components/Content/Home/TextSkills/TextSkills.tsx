import React, { FC, useEffect, useRef, useState, useCallback } from "react";
import style from "./TextSkills.module.scss";

type Props = {}

const TextSkills: FC<Props> = (props) => {
   const text = useRef<HTMLDivElement>(null);
   const requestRef = useRef<any>();
   const phrases: Array<string> = [
      'Frontend',
      'React',
      'Backend',
      'Express',
      'Freelancer',
      'Designer'
   ];

   const [ counter, setCounter ] = useState<number>(0);

   const update = useCallback((queue: Array<any>) => {
      const chars = '!<>-_\\/[]{}—=+*^?#________';
      let frame: number = 0;

      const animationFrame = () => {
         let output: string = '';
         let complete: number = 0;

         for (let i = 0; i < queue.length; i++) {
            let { from, to, start, end, char } = queue[i];
            if (frame >= end) {
               complete++;
               output += to;
            } else if (frame >= start) {
               if (!char || Math.random() < 0.23) {
                  char = chars[Math.floor(Math.random() * chars.length)];
                  queue[i].char = char;
               }
               output += `<span>${char}</span>`;
            } else {
               output += from;
            }
         }

         // @ts-ignore
         text.current.innerHTML = output;
         if (complete === queue.length) {
            cancelAnimationFrame(requestRef.current);
            frame = 0;
            setCounter((counter + 1) % phrases.length);
         } else {
            requestRef.current = requestAnimationFrame(animationFrame);
            frame++;
         }
      };
      animationFrame();
   }, [ counter, phrases ]);

   const setText = useCallback((newText: string) => {
      let queue: Array<any> = [];
      // @ts-ignore
      const oldText = text.current.innerText;
      const length = Math.max(oldText.length, newText.length);
      for (let i = 0; i < length; i++) {
         const from = oldText[i] || '';
         const to = newText[i] || '';
         const start = Math.floor(Math.random() * 40);
         const end = start + Math.floor(Math.random() * 40);
         queue.push({ from, to, start, end });
      }
      update(queue);
   }, [ update ])

   useEffect(() => {
      const timeout = setTimeout(() => setText(phrases[counter]), 3500);
      return () => {
         clearTimeout(timeout);
      }
   }, [ counter, setText, phrases ]);

   useEffect(() => {
      return () => cancelAnimationFrame(requestRef.current);
   }, []);

   return (
      <div className={style.skill_text}>
         <div className={style.text} ref={text}>|</div>
      </div>
   );
};
export default TextSkills;