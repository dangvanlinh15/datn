import { memo, useCallback, useEffect, useState } from "react";
import { IC_ATTACH, IC_EMOTION, IC_IMAGE, IC_LIKE } from "../../../images";
import { useSelector } from "react-redux";
import moment from "moment";

const formatDate = "YYYY-MM-DD HH:mm:ss";

export const MainMessage = memo(({ sendMessage, messages }) => {
    const user = useSelector((state) => state.auth.user);
    const [message, setMessage] = useState("");

    const onKey = useCallback(
        (event) => {
            if (event.keyCode == 13) {
                let val = {
                    username: user.username,
                    sender: user.lastName,
                    content: event.target.value.trim(),
                    date: moment(new Date()).format(formatDate),
                    type: "JOIN",
                };
                setMessage(val);

                event.preventDefault();
                sendMessage(val);
                setMessage("");
            }
        },
        [message]
    );

    const changeMessage = useCallback(
        (event) => {
            setMessage(event.target.value);
        },
        [message]
    );

    return (
        <div className="main-message d-flex">
            <div className="conversation d-flex flex-column p-2">
                {messages.map((item, index) => {
                    return (
                        <div key={index}>
                            {item.username == user.username ? (
                                <div
                                    className="send-messages d-flex justify-content-end my-2"
                                    key={index}
                                >
                                    <div className="d-flex flex-column">
                                        <div className="name-sender align-self-end mx-1">
                                            {item.sender}
                                        </div>
                                        <div className="text-message">
                                            {item.content}
                                        </div>
                                    </div>
                                    <div className="avatar d-flex justify-content-center align-content-center align-self-end mx-2">
                                        {item.sender[0]}
                                    </div>
                                </div>
                            ) : (
                                <div
                                    className="receive-messages d-flex my-2 justify-content-start"
                                    key={index}
                                >
                                    <div className="avatar d-flex justify-content-center align-content-center align-self-end mx-2">
                                        {item.sender[0]}
                                    </div>
                                    <div className="d-flex flex-column">
                                        <div className="name-sender align-self-start mx-">
                                            {item.sender}
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
