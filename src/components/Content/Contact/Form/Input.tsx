import React, { FC } from "react";
import { Field } from "formik";

type Props = {
   name: string
   label: string
   component?: string
   methods: any
}

const Input: FC<Props> = ({ name, label, component = 'input', methods }) => {
   const { handleChange, handleBlur, values, touched, errors } = methods;
   return (
      <div>
         <Field name={name} type='text' component={component}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values[name]}>
         </Field>
         <span id='span_border' style={{backgroundColor: `${touched[name] && errors[name] ? '#F80759' : '#36BA7C'}`}}/>
         <label id='label_field'>{touched[name] && errors[name] ? errors[name] : label}</label>
      </div>
   );
};
export default Input;