import React, { FC } from "react";

type Props = {
   data: Array<{
      text: string,
      load: number
   }>
};

const SkillsList: FC<Props> = ({ data }) => {
   return (
      <ul>
         {
            data.map(({ text, load }, id) => (
               <li key={`${text}_${id}`} className='load' data-load={load}>— {text}</li>
            ))
         }
      </ul>
   );
};
export default SkillsList;