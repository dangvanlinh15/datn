import { memo, useEffect, useState } from "react";
import { HeaderMessage } from "./components/HeaderMessage";
import { Header } from "../../components/Header";
import { SideLeftMessage } from "./components/SideLeftMessage";
import { SideRightMessage } from "./components/SideRightMessage";
import { MainMessage } from "./components/MainMessage";
import SockJS from "sockjs-client";
import { over } from "stompjs";

let stompClient = null;

export const Message = memo(() => {
    const [messages, setMessages] = useState([]);
    const [messagers, setMessager] = useState([
        // {
        //     name: "Nguyễn Văn A",
        //     user: "0123456789",
        //     time: "5 ngày trước",
        //     endMessage: "Bạn: Hello",
        // },
        // {
        //     name: "Nguyễn Văn B",
        //     user: "0987654321",
        //     time: "2 tiếng trước",
        //     endMessage: "Bạn: Nice to meet you",
        // },
    ]);

    const connectionSocket = (headers = {}) => {
        let Sock = new SockJS("http:localhost:8080/ws");
        stompClient = over(Sock);
        stompClient.connect(headers, onConnected, onError);
    };
    const disConnectionSocket = () => {};

    const onConnected = () => {
        console.log("websocket connected !");
        subcribeTopic();
    };

    const onError = () => {
        console.log("error");
    };

    const subcribeTopic = (topic = "public") => {
        stompClient.subscribe(`/topic/${topic}`, receiveMessage);
    };

    const unSubcribeTopic = () => {};

    const sendMessage = (message, headers = {}) => {
        stompClient.send("/app/sendMessage", headers, JSON.stringify(message));
    };

    const receiveMessage = (payload) => {
        if (payload.body) {
            let val = JSON.parse(payload.body);
            console.log(val);
            setMessages((prev) => {
                return [...prev, val];
            });
        }
    };

    useEffect(() => {
        connectionSocket();
    }, []);

    return (
        <div className="message d-flex flex-column">
            <Header />
            <div className="container-message d-flex">
                <SideLeftMessage messagers={messagers} />
                <div className="content-message d-flex flex-column">
                    <HeaderMessage />
                    <MainMessage
                        sendMessage={sendMessage}
                        messages={messages}
                    />
                </div>
                <SideRightMessage />
            </div>
        </div>
    );
});
