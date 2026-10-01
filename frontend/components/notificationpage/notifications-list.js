"use client";

import { useState } from "react";
import NotificationItem from "./notification-item";
import NotificationModal from "./notification-modal";
import MarkNotificationRead from "../actions/mark-notification-read";

export default function NotificationsList({ notifications }) {
    const [selectedNotification, setSelectedNotification] = useState(null);
    const [notificationList, setNotificationList] = useState(notifications);

    async function handleNotificationClick(notification) {
        setSelectedNotification(notification);

        if (!notification.is_read) {
            try {
                await MarkNotificationRead(notification.id);

                setNotificationList((current) =>
                    current.map((item) =>
                        item.id === notification.id
                            ? { ...item, is_read: true }
                            : item
                    )
                );
            } catch (error) {
                console.error(
                    "Failed to mark notification as read:",
                    error
                );
            }
        }
    }

    return (
        <>
            <div className="space-y-3 ">
                {notificationList.map((notification) => (
                    <NotificationItem
                        key={notification.id}
                        notification={notification}
                        onClick={handleNotificationClick}
                    />
                ))}
            </div>

            {selectedNotification && (
                <NotificationModal
                    notification={selectedNotification}
                    onClose={() => setSelectedNotification(null)}
                />
            )}
        </>
    );
}