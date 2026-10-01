import { formatRelativeTime } from "../date-transation/date-transation";

export default function NotificationModal({
    notification,
    onClose,
}) {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-overlay px-4"
            onClick={onClose}
        >
            <div
                className="w-full max-w-md rounded-2xl bg-surface p-6 shadow-2xl"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-text">
                        Notification
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        className="text-2xl text-text-muted hover:text-text"
                    >
                        ×
                    </button>
                </div>

                <p className="mt-6 text-text">
                    {notification.message}
                </p>

                <p className="mt-4 text-sm text-text-muted">
                    {formatRelativeTime(notification.created_at)}
                </p>

                <div className="mt-6 flex justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-text-on-primary hover:bg-primary-hover"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}