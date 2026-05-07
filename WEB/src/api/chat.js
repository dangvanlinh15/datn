import axiosClient from "./axiosClient";

export const getChatCustomers = (currentUserId) => {
    return axiosClient("get", "/chat/customers", {}, { currentUserId });
};

export const getChatMessages = (userId, recipientId) => {
    return axiosClient("get", "/chat/messages", {}, { userId, recipientId });
};
