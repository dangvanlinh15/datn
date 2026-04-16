import {memo} from "react";

export const Select = memo(({defaultName, defaultValue, listItems, changeSelect, keyName, disable=false})=>{
    const handleChangeSelect = (event)=>{
        const raw = event.target.value;
        // Try to parse as JSON (for range objects like price/square)
        try {
            const parsed = JSON.parse(raw);
            changeSelect(keyName, parsed);
        } catch {
            changeSelect(keyName, raw);
        }
    }

    // Determine default value: if defaultValue is an object, serialize it
    const defaultVal = (typeof defaultValue === "object" && defaultValue !== null)
        ? JSON.stringify(defaultValue)
        : defaultValue;

    return (
        <select className="form-select" onChange={(handleChangeSelect)} disabled={disable}>
            <option selected value={defaultVal}>{defaultName}</option>
            {listItems.map((item, index)=>{
                // If item has min/max, serialize as JSON; otherwise use item.value
                const optionValue = ("min" in item)
                    ? JSON.stringify({ min: item.min, max: item.max })
                    : item.value;
                return <option key={index} value={optionValue}>{item.label}</option>
            })}
        </select>
    )
})
