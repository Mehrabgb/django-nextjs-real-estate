"use client";

import { useState } from "react";
import Link from "next/link";
import Logout from "@/actions/logoutaction";
import EditProfile from "../edit-profie/edit-profile-image";
import Image from "next/image";

export default function UserMenu({ inituser }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
    const [user,setuser]=useState(inituser)
    return (
        <div className="relative">
            {/* Menu button */}
            <button
                type="button"
                onClick={() => setIsOpen((current) => !current)}
                className="flex items-center gap-3 rounded-xl p-2 transition hover:bg-card-hover"
            >
                {/* User image */}
                <div className="h-9 w-9 overflow-hidden rounded-full bg-surface-muted">
                        <Image
                            src={user.image? user.image : '/no-profile.png'}
                            alt={user.username}
                            height={100}
                            width={100}
                            className="h-full w-full object-cover"
                        />
                </div>

                {/* Username */}
                <span className="hidden text-sm font-medium text-text sm:block">
                    {user?.username}
                </span>

                <span className="text-text-muted">
                    {isOpen ? "▲" : "▼"}
                </span>
            </button>

            {/* Menu */}
            {isOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-xl border border-border bg-surface shadow-lg">

                    {/* User information */}
                    <div className="border-b border-border px-4 py-4">
                        <p className="font-semibold text-text">
                            {user?.username}
                        </p>

                        <p className="mt-1 text-sm capitalize text-text-muted">
                            {user?.email}
                        </p>
                    </div>

                    {/* Menu links */}
                    <div className="p-2">

                        <button
                            type="button"
                            onClick={() => {
                                setIsOpen(false);
                                setIsEditProfileOpen(true);
                            }}
                            className="block rounded-lg px-3 py-2 text-sm text-text-muted hover:bg-card-hover"
                        >
                            Edit Profile Image
                        </button>

                        <Link
                            href="/create/seller"
                            className="block rounded-lg px-3 py-2 text-sm text-text-muted hover:bg-card-hover"
                        >
                            Create Seller Account
                        </Link>

                    </div>

                    {/* Logout */}
                    <div className="border-t border-border p-2">
                        <button
                            onClick={() => Logout()}
                            type="button"
                            className="w-full rounded-lg px-3 py-2 text-left text-sm text-danger hover:bg-danger/10"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
            {isEditProfileOpen && (
                <EditProfile
                    user={user}
                    onClose={() => setIsEditProfileOpen(false)}
                    onUpdated={(updatedUser) => {
                        setuser(updatedUser)
                    }}
                />
            )}
        </div>
    );
}