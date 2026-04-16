import { memo } from "react";

export const Input = memo(({id, type, placeholder, label, keyName, val, changeInput, min, max, required=false }) => {

    const handleChangeInput = (event) => {
        changeInput(keyName, event.target.value)
    }
    
    return (
        <div>
            <label htmlFor={id}>{label} {required && <span className="require">*</span>}</label>
            <input type={type} placeholder={placeholder} id={id} value={val} onChange={handleChangeInput} className="form-control" min={min} max={max} required={required}/>
        </div>)
})