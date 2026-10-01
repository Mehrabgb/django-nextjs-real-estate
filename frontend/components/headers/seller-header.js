import Link from "next/link";
import UserMenu from "./seller-menu-modal";
import NotificationsButton from "../bottons/notification";
import ThemeToggle from "../bottons/theme-toggle";

export default function SellerHeader({ user,notificationscount }) {
    return (
        <header className="border-b border-border bg-surface">
            <div className="mx-auto flex h-16 max-w-8xl items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* Logo */}
                    
                <div className="flex">
                    <Link
                        href="/"
                        className="text-xl mr-3 font-bold text-primary"
                    >
                        RealEstate
                    </Link>
                    <NotificationsButton unreadCount={notificationscount}/>
                    <div className="ml-5 flex items-center gap-3">
                        <ThemeToggle />

                    </div>
                </div>

                {/* Navigation */}
                <nav className="hidden items-center gap-6 md:flex">
                    <Link
                        href="/"
                        className="text-sm font-medium text-text-muted hover:text-primary"
                    >
                        Home
                    </Link>

                    <Link
                        href="/myproperty"
                        className="text-sm font-medium text-text-muted hover:text-primary"
                    >
                        My Properties
                    </Link>

                </nav>

                {/* User menu */}
                <UserMenu inituser={user} />
            </div>
        </header>
    );
}