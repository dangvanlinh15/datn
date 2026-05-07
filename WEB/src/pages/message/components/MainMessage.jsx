import { memo, useCallback, useEffect, useRef, useState } from "react";
import { IC_ATTACH, IC_EMOTION, IC_IMAGE, IC_LIKE } from "../../../images";

export const MainMessage = memo(({ sendMessage, messages, currentUser, activeMessager }) => {
    const [message, setMessage] = useState("");
    const conversationRef = useRef(null);
    const getSenderPhone = useCallback((item) => {
        if (item.senderId === currentUser.id) {
            return currentUser.phone;
        }
        if (item.senderId === activeMessager?.userId) {
            return activeMessager?.phone;
        }
        return "";
    }, [activeMessager, currentUser]);

    useEffect(() => {
        if (conversationRef.current) {
            conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
        }
    }, [messages]);

    const onKey = useCallback(
        (event) => {
            if (event.keyCode === 13 && !event.shiftKey) {
                if (!message.trim() || !activeMessager) {
                    event.preventDefault();
                    return;
                }

                let val = {
                    senderId: currentUser.id,
                    senderName: currentUser.name,
                    recipientId: activeMessager.userId,
                    recipientName: activeMessager.name,
                    content: message.trim(),
                };

                event.preventDefault();
                sendMessage(val);
                setMessage("");
            }
        },
        [activeMessager, currentUser, message, sendMessage]
    );

    const changeMessage = useCallback(
        (event) => {
            setMessage(event.target.value);
        },
        []
    );

    return (
        <div className="main-message d-flex">
            <div className="conversation d-flex flex-column p-2" ref={conversationRef}>
                {!activeMessager && (
                    <div className="empty-message d-flex align-items-center justify-content-center">
                        Chọn một khách hàng để bắt đầu trò chuyện
                    </div>
                )}
                {messages.map((item, index) => {
                    return (
                        <div key={index}>
                            {item.senderId === currentUser.id ? (
                                <div className="send-messages d-flex justify-content-end my-2">
                                    <div className="d-flex flex-column">
                                        <div className="name-sender align-self-end mx-1">
                                            {item.senderName}
                                            {getSenderPhone(item) ? ` - ${getSenderPhone(item)}` : ""}
                                        </div>
                                        <div className="text-message">
                                            {item.content}
                                        </div>
                                    </div>
                                    <div className="avatar d-flex justify-content-center align-content-center align-self-end mx-2">
                                        {(item.senderName || "K")[0]}
                                    </div>
                                </div>
                            ) : (
                                <div className="receive-messages d-flex my-2 justify-content-start">
                                    <div className="avatar d-flex justify-content-center align-content-center align-self-end mx-2">
                                        {(item.senderName || "K")[0]}
                                    </div>
                                    <div className="d-flex flex-column">
                                        <div className="name-sender align-self-start mx-">
                                            {item.senderName}
                                            {getSenderPhone(item) ? ` - ${getSenderPhone(item)}` : ""}
                                        </div>
                                        <div className="text-message">
                                            {item.content}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}

                <div className="time"></div>
            </div>
            <div className="ip-message d-flex align-items-center px-2 py-3">
                <img
                    src={IC_IMAGE}
                    alt="not-found"
                    className="ic-image mx-1"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Gửi hình ảnh"
                />
                <img
                    src={IC_ATTACH}
                    alt="not-found"
                    className="ic-attach mx-1"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Đính kèm file"
                />
                <textarea
                    type="text"
                    className="form-control"
                    value={message}
                    col={1}
                    placeholder="Aa"
                    disabled={!activeMessager}
                    onChange={changeMessage}
                    onKeyDown={onKey}
                />
                <img
                    src={IC_EMOTION}
                    alt="not-found"
                    className="ic-emotion mx-1"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="emotion"
                />
                <img
                    src={IC_LIKE}
                    alt="not-found"
                    className="ic-like"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="like"
                />
            </div>
        </div>
    );
});
