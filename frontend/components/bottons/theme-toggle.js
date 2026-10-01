"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const [dark, setDark] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");

        const isDark = savedTheme === "dark";

        document.documentElement.classList.toggle("dark", isDark);
        setDark(isDark);
    }, []);

    function toggleTheme() {
        const newDark = !dark;

        document.documentElement.classList.toggle("dark", newDark);
        localStorage.setItem("theme", newDark ? "dark" : "light");

        setDark(newDark);
    }

    return (
        <button
            type="button"
            onClick={toggleTheme}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            title={dark ? "Light mode" : "Dark mode"}
            className="
                flex h-10 w-10 items-center justify-center
                rounded-full
                border border-border
                bg-surface
                text-text
                transition
                hover:bg-card-hover
                focus:outline-none
                focus:ring-2
                focus:ring-primary/40
            "
        >
            {dark ? (
                // Sun
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                    className="h-5 w-5"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-2.227-1.591 1.591M5.25 12H3m3.227-4.773L4.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                    />
                </svg>
            ) : (
                // Moon
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                    className="h-5 w-5"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.752 15.002A9.718 9.718 0 0 1 18 15.75
                        c-5.385 0-9.75-4.365-9.75-9.75
                        0-1.33.266-2.598.748-3.752
                        A9.753 9.753 0 1 0 21.752 15.002Z"
                    />
                </svg>
            )}
        </button>
    );
}