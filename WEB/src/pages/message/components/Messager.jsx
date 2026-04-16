import { memo } from "react";

export const Messager = memo(({name, endMessage, time}) => {
    return (
        <div className="messager d-flex justify-content-between p-2">
            <div className="d-flex align-items-center">
                <div className="avatar d-flex justify-content-center align-content-center mx-2">
                    {name.at(-1)}
                </div>
                <div className="info">
                    <div className="label">{name}</div>
                    <div className="text-opa">
                        {endMessage}
                    </div>
                </div>
            </div>
            <div className="time-end py-2">
                {time}
            </div>  
        </div>
    )
})