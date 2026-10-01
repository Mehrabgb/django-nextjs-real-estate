"use client";

import { useState } from "react";
import NotificationItem from "./notification-item";
import NotificationModal from "./notification-modal";
import MarkNotificationRead from "@/actions/set-readed-notifications";

export default function NotificationsInteractive({ notifications }) {
    const [notificationList, setNotificationList] = useState(
        notifications
    );

    const [selectedNotification, setSelectedNotification] =
        useState(null);

    async function handleNotificationClick(notification) {
        setSelectedNotification(notification);

        if (notification.is_read) {
            return;
        }

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

    return (
        <>
            <div className="space-y-3">
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