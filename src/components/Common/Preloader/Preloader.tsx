import React, { FC } from "react";
import style from "./Preloader.module.scss";

type Props = {}

const Preloader: FC<Props> = (props) => {
    return (
        <div className={style.preloader}>
            <h1>Loading...</h1>
        </div>
    );
};
export default Preloader;