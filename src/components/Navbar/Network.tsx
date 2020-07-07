import React, { FC, useState } from "react";
import anime from "animejs";

type Props = {
   color: string;
   background: string;
   widthText: number;
   text: string;
   link: string;
   copy?: HTMLDivElement | null;
   children: React.ReactNode;
}

const Network: FC<Props> = ({ link, copy, text, children, widthText, color, background }) => {
   const [ isHover, setHover ] = useState<boolean>(false);
   const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      const target = e.target as HTMLAnchorElement | any;
      if (copy && target) {
         e.preventDefault();
         const range = document.createRange();
         range.selectNode(copy);
         // @ts-ignore
         window.getSelection().addRange(range);
         document.execCommand('copy');
         // @ts-ignore
         window.getSelection().removeAllRanges();
         const elem: HTMLAnchorElement = target.closest('a').lastElementChild;
         anime({
            targets: elem,
            opacity: [ { value: .85, }, { value: 0, delay: 250 } ],
            duration: 400,
            easing: 'linear'
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
         <p style={isHover ? { width: widthText, marginLeft: '.6em', opacity: 1 } : {}}>{text}</p>
         {copy && <span>Copy</span>}
      </a>
   );
};
export default Network;