import Link from "next/link";

export default function NotificationsButton({ unreadCount }) {
    return (
        <Link
            href="/notifications"
            className="relative flex items-center justify-center rounded-lg p-2 text-text-muted transition hover:bg-card-hover hover:text-text"
            aria-label={
                unreadCount > 0
                    ? `${unreadCount} unread notifications`
                    : "Notifications"
            }
        >
            {/* Bell */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="h-6 w-6"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 0 1-5.714 0
                       A2.25 2.25 0 0 1 7.5 14.84V11a4.5 4.5 0 0 1
                       9 0v3.84a2.25 2.25 0 0 1-1.643 2.242ZM9.75
                       17.25a2.25 2.25 0 0 0 4.5 0"
                />
            </svg>

            {/* Unread count */}
            {unreadCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-danger px-1 text-[11px] font-semibold leading-none text-white">
                    {unreadCount > 99 ? "99+" : unreadCount}
                </span>
            )}
        </Link>
    );
}