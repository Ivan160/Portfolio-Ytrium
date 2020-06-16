import React, { FC } from "react";
import style from "./Intelecom.module.scss";

type Props = {}

const Intelecom: FC<Props> = (props) => {
    return (
        <div className={style.project}>
            <h1>Intelecom</h1>
        </div>
    );
};
export default Intelecom;