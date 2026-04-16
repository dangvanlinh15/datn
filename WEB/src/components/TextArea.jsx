import { memo, useCallback } from "react";

export const TextArea = memo(({label, id, type, placeholder, cols, rows, keyName, val, changeTextArea, required= false}) => {
    const handleChangeTextArea = useCallback((event) => {
        changeTextArea(keyName, event.target.value)
    })
    return (
        <div>
            <label htmlFor={id}>{label}{required && <span className="require">*</span>}</label>
            <textarea type={type} placeholder={placeholder} id={id} cols={cols} rows={rows} value={val} onChange={handleChangeTextArea} className="form-control" required={required} ></textarea>
        </div> 
    )
})