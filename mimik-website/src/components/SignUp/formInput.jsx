
import { useState } from "react";
import "./forminput.css"

const FormInput = (props) =>{

    const [focused,setFocused] = useState(false)
    const{label,errorMessage,onChange,id,...inputProps} = props;
    
    const hableFocues = (e) =>{
        setFocused(true);
    };
    
    return(
        <div className = "formInput mt-3 pt-3">
        <label>{label}</label>
        <input {...inputProps}
        onChange={onChange}
        onBlur={hableFocues} 
        onFocus={()=>inputProps.name === "confirmPassword" && setFocused(true)}
        focused = {focused.toString()}/>
        <span>{errorMessage}</span>
        </div>
    )
}

export default FormInput