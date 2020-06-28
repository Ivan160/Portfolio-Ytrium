import React, { FC, useState } from "react";
import anime from "animejs";

type Props = {
   color: string;
   background: string;
   widthText: number;
   text: string;
   link: string;
   copy?: string
   children: React.ReactNode
}

const Network: FC<Props> = ({ link, copy, text, children, widthText, color, background }) => {
   const [ isHover, setHover ] = useState<boolean>(false);
   const onClick = (e: any) => {
      if (copy && e.target) {
         e.preventDefault();
         navigator.clipboard.writeText(copy);
         const elem = e.target.closest('a').lastElementChild;
         anime({
            targets: elem,
            opacity: [
               {value: .85, easing: 'linear', duration: 400},
               {value: 0, easing: 'linear', delay: 250, duration: 400}
            ]
         });
      }
   };
   return (
      <a href={link} target="_blank" rel="noopener noreferrer"
         onMouseEnter={() => setHover(true)}
         onMouseLeave={() => setHover(false)}
         onClick={(e) => copy && onClick(e)}
         style={isHover ? { backgroundColor: `rgba(${background}, .25)`, color: `rgba(${color}, 1)` } : {}}>
         {children}
         <p style={isHover ? { width: widthText, marginLeft: '.5em' } : {}}>{text}</p>
         {copy && <span id={copy}>Copy</span>}
      </a>
   );
};
export default Network;