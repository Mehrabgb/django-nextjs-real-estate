"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import UpdateProfileImage from "@/actions/edit-image";

export default function EditProfile({ user, onClose, onUpdated }) {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(
        user?.image || "/no-profile.png"
    );
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        return () => {
            if (preview?.startsWith("blob:")) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    function handleImageChange(event) {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        setError("");

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
        ];

        if (!allowedTypes.includes(file.type)) {
            setError("Please select a JPG, PNG, or WebP image.");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setError("Image size must be less than 5 MB.");
            return;
        }

        if (preview?.startsWith("blob:")) {
            URL.revokeObjectURL(preview);
        }

        setImage(file);
        setPreview(URL.createObjectURL(file));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (!image) {
            setError("Please select an image.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const formData = new FormData();
            formData.append("image", image);

            const data = await UpdateProfileImage(formData);

            onUpdated?.(data);
            onClose();
        } catch (error) {
            console.error(error);
            setError("Failed to update profile picture.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-overlay px-4"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    onClose();
                }
            }}
        >
            <div
                className="w-full max-w-md rounded-2xl bg-surface p-6 shadow-xl"
                onMouseDown={(event) => event.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-text">
                        Edit Profile
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-xl text-text-muted hover:bg-card-hover hover:text-text"
                        aria-label="Close"
                    >
                        ×
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="mt-8 flex flex-col items-center"
                >
                    {/* Profile image */}
                    <div className="relative h-32 w-32 overflow-hidden rounded-full bg-surface-muted">
                        <Image
                            src={preview}
                            alt={user?.username || "Profile picture"}
                            fill
                            sizes="128px"
                            className="object-cover"
                        />
                    </div>

                    {/* Change image */}
                    <label
                        htmlFor="profile-image"
                        className="mt-5 cursor-pointer rounded-lg border border-input-border px-4 py-2 text-sm font-medium text-text-muted transition hover:bg-card-hover"
                    >
                        Change Photo
                    </label>

                    <input
                        id="profile-image"
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleImageChange}
                        className="hidden"
                    />

                    {/* Error */}
                    {error && (
                        <p className="mt-4 text-center text-sm text-danger">
                            {error}
                        </p>
                    )}

                    {/* Buttons */}
                    <div className="mt-8 flex w-full gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="flex-1 rounded-lg border border-input-border px-4 py-2.5 text-sm font-medium text-text-muted transition hover:bg-card-hover disabled:opacity-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={!image || loading}
                            className="flex-1 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-text-on-primary transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {loading ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}