import Link from "next/link";
import ThemeToggle from "../bottons/theme-toggle";

export default function GuestHeader() {
    return (
       <header className="border-b border-border bg-surface">
            <div className="mx-auto flex h-16 max-w-8xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex">
                    <Link
                        href="/"
                        className="text-xl font-bold text-text"
                    >
                        RealEstate
                    </Link>
                    <div className="ml-5 flex items-center gap-3">
                        <ThemeToggle />

                    </div>
                </div>

                <nav>
                <Link
                    href="/register"
                    className="mr-3 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-text-on-primary hover:bg-primary-hover"
                >
                    Register
                </Link>
                <Link
                    href="/login"
                    className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-text-on-primary hover:bg-primary-hover"
                >
                    Login
                </Link>
                </nav>
            </div>
        </header>
    );
}