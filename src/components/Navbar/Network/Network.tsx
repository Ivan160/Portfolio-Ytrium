import React, { FC, useState } from "react";
import { Link } from "react-router-dom";

type Props = {
    color: string;
    background: string;
    widthText: number;
    text: string;
    link: string;
    children: React.ReactNode
}

const Network: FC<Props> = ({ link, text, children, widthText, color, background }) => {
    const [ isHover, setHover ] = useState<boolean>(false);
    return (
        <Link to={link} className='network'
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              style={isHover ? { backgroundColor: `rgba(${background}, .25)`, color: `rgba(${color}, 1)` } : {}}>
            {children}
            <p style={isHover ? { width: widthText, marginLeft: '.5em' } : {}}>{text}</p>
        </Link>
    );
};
export default Network;