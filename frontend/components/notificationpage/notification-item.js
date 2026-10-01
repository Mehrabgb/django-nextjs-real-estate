import { formatRelativeTime } from "../date-transation/date-transation";

export default function NotificationItem({ notification, onClick }) {
    return (
        <button
            type="button"
            onClick={() => onClick(notification)}
            className={`w-full rounded-xl border p-4 text-left transition ${
                notification.is_read
                    ? "border-border bg-card"
                    : "border-primary/30 bg-primary/10"
            }`}
        >
            <div className="flex items-start gap-3">

                <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                        notification.is_read
                            ? "bg-surface-muted"
                            : "bg-primary/15"
                    }`}
                >
                    🔔
                </div>

                <div className="flex-1">
                    <p className="font-medium text-text">
                        {notification.message}
                    </p>

                    <p className="mt-1 text-sm text-text-muted">
                        {formatRelativeTime(notification.created_at)}
                    </p>
                </div>

                {!notification.is_read && (
                    <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-primary" />
                )}
            </div>
        </button>
    );
}