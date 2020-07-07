import React, { FC, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import anime from "animejs";

type Props = { links: string[] };

const LinkPage: FC<Props> = ({ links }) => {
   const linkBlock = useRef<HTMLDivElement>(null);
   useEffect(() => {
      anime({
         targets: linkBlock.current,
         opacity: .6,
         delay: 1500,
         duration: 800,
         easing: 'linear'
      });
   }, []);
   return (
      <div className='link_page' ref={linkBlock}>
         {links.map((link, id) => (<Link key={`${link}_${id}`} to={`/${link}`}>{link}</Link>))}
      </div>
   );
};
export default LinkPage;