import React, { FC, useState } from "react";

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
      if (copy) {
         e.preventDefault();
         navigator.clipboard.writeText(copy);
      }
   };
   return (
      <a href={link} target="_blank" rel="noopener noreferrer"
         onMouseEnter={() => setHover(true)}
         onMouseLeave={() => setHover(false)}
         onClick={onClick}
         style={isHover ? { backgroundColor: `rgba(${background}, .25)`, color: `rgba(${color}, 1)` } : {}}>
         {copy && <span id={copy}>Copy</span>}
         {children}
         <p style={isHover ? { width: widthText, marginLeft: '.5em' } : {}}>{text}</p>
      </a>
   );
};
export default Network;