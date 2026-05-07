import { memo } from "react";

export const Messager = memo(({ messager, isActive, onClick }) => {
    const name = messager.name || messager.phone || "Khách hàng";
    const endMessage = messager.lastMessage || "Chưa có tin nhắn";

    return (
        <div
            className={`messager d-flex justify-content-between p-2 ${isActive ? "active" : ""}`}
            onClick={onClick}
        >
            <div className="d-flex align-items-center">
                <div className="avatar d-flex justify-content-center align-content-center mx-2">
                    {name[0]}
                </div>
                <div className="info">
                    <div className="label">{name}</div>
                    <div className="text-opa">
                        {messager.phone ? `${messager.phone} - ` : ""}
                        {endMessage}
                    </div>
                </div>
            </div>
            {/* <div className="time-end py-2">
                {time}
            </div>   */}
        </div>
    )
})
