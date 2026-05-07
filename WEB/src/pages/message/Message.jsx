import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { HeaderMessage } from "./components/HeaderMessage";
import { Header } from "../../components/Header";
import { SideLeftMessage } from "./components/SideLeftMessage";
import { SideRightMessage } from "./components/SideRightMessage";
import { MainMessage } from "./components/MainMessage";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import { getChatCustomers, getChatMessages } from "../../api/chat";
import { storage1 } from "../../service/storage";

export const Message = memo(() => {
    const [messages, setMessages] = useState([]);
    const [messagers, setMessager] = useState([]);
    const [activeMessager, setActiveMessager] = useState(null);
    const [connected, setConnected] = useState(false);
    const stompClient = useRef(null);
    const subscription = useRef(null);

    const currentUser = useMemo(() => {
        const firstName = storage1.getItem("firstName") || "";
        const lastName = storage1.getItem("lastName") || "";
        const phone = storage1.getItem("phone") || storage1.getItem("email") || "";
        const fullName = `${lastName} ${firstName}`.trim();

        return {
            id: storage1.getItem("id"),
            phone: phone,
            email: storage1.getItem("email") || "",
            name: fullName || phone || "Khách hàng",
        };
    }, []);

    const loadCustomers = useCallback(() => {
        if (!currentUser.id) {
            return;
        }

        getChatCustomers(currentUser.id).then((res) => {
            const customers = res.data.filter((item) => {
                return (
                    item.userId !== currentUser.id &&
                    item.phone !== currentUser.phone &&
                    item.phone !== currentUser.email
                );
            });
            setMessager(customers);
            setActiveMessager((prev) => {
                if (prev && customers.some((item) => item.userId === prev.userId)) {
                    return prev;
                }
                return customers[0] || null;
            });
        });
    }, [currentUser.email, currentUser.id, currentUser.phone]);

    const connectionSocket = useCallback((headers = {}) => {
        const sock = new SockJS("http://localhost:8080/ws");
        stompClient.current = over(sock);
        stompClient.current.connect(headers, onConnected, onError);
    }, []);

    const disConnectionSocket = useCallback(() => {
        if (subscription.current) {
            subscription.current.unsubscribe();
        }
        if (stompClient.current) {
            stompClient.current.disconnect();
        }
    }, []);

    const onConnected = () => {
        setConnected(true);
    };

    const onError = () => {
        setConnected(false);
        console.log("error");
    };

    const subcribeTopic = useCallback((conversationId) => {
        if (!stompClient.current || !connected || !conversationId) {
            return;
        }
        if (subscription.current) {
            subscription.current.unsubscribe();
        }
        subscription.current = stompClient.current.subscribe(
            `/topic/chat/${conversationId}`,
            receiveMessage
        );
    }, [connected]);

    const sendMessage = (message, headers = {}) => {
        if (!stompClient.current || !connected) {
            return;
        }
        stompClient.current.send("/app/chat.send", headers, JSON.stringify(message));
    };

    const receiveMessage = (payload) => {
        if (payload.body) {
            let val = JSON.parse(payload.body);
            setMessages((prev) => {
                return [...prev, val];
            });
            loadCustomers();
        }
    };

    const selectMessager = useCallback((messager) => {
        setActiveMessager(messager);
    }, []);

    useEffect(() => {
        loadCustomers();
        connectionSocket();
        return disConnectionSocket;
    }, [connectionSocket, disConnectionSocket, loadCustomers]);

    useEffect(() => {
        if (!currentUser.id || !activeMessager) {
            setMessages([]);
            return;
        }

        getChatMessages(currentUser.id, activeMessager.userId).then((res) => {
            setMessages(res.data);
        });
        subcribeTopic(activeMessager.conversationId);
    }, [activeMessager, currentUser.id, subcribeTopic]);

    return (
        <div className="message d-flex flex-column">
            <Header />
            <div className="container-message d-flex">
                <SideLeftMessage
                    messagers={messagers}
                    activeMessager={activeMessager}
                    onSelectMessager={selectMessager}
                />
                <div className="content-message d-flex flex-column">
                    <HeaderMessage activeMessager={activeMessager} connected={connected} />
                    <MainMessage
                        sendMessage={sendMessage}
                        messages={messages}
                        currentUser={currentUser}
                        activeMessager={activeMessager}
                    />
                </div>
                {/* <SideRightMessage /> */}
            </div>
        </div>
    );
});
