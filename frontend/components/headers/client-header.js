import Link from "next/link";
import UserMenu from "./client-menu-modal";
import ThemeToggle from "../bottons/theme-toggle";

export default function ClientHeader({ user }) {
    return (
        <header className="border-b border-border bg-surface">
            <div className="mx-auto flex h-16 max-w-8xl items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* Logo */}
                <div className="flex">
                    <Link
                        href="/"
                        className="text-xl font-bold text-primary"
                    >
                        RealEstate
                    </Link>
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
                        href="/favorites"
                        className="text-sm font-medium text-text-muted hover:text-primary"
                    >
                        Favorites
                    </Link>
                </nav>

                {/* User menu */}
                <UserMenu inituser={user} />
            </div>
        </header>
    );
}