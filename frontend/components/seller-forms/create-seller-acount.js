"use client";

import { useState } from "react";
import Image from "next/image";
import CreateSellerAction from "@/actions/create-seller-acount";

export default function CreateSellerAccountComponent() {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("/no-profile.png");
    const [number, setNumber] = useState("");
    const [bio, setBio] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    function handleImageChange(event) {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        setImage(file);
        setPreview(URL.createObjectURL(file));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setError("");

        if (!number.trim()) {
            setError("Phone number is required.");
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();

            formData.append("number", number.trim());

            if (bio.trim()) {
                formData.append("bio", bio.trim());
            }

            if (image) {
                formData.append("image", image);
            }

            await CreateSellerAction(formData);

        } catch (error) {
            setError(error.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-[calc(100vh-4rem)] bg-background px-4 py-10">
            <div className="mx-auto max-w-xl">
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">

                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-text">
                            Create Seller Account
                        </h1>

                        <p className="mt-2 text-sm text-text-muted">
                            Create your seller profile to start adding properties.
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="mt-8 space-y-6"
                    >
                        <div className="flex flex-col items-center">
                            <div className="relative h-28 w-28 overflow-hidden rounded-full bg-surface-muted">
                                <Image
                                    src={preview}
                                    alt="Profile preview"
                                    fill
                                    sizes="112px"
                                    className="object-cover"
                                />
                            </div>

                            <label
                                htmlFor="seller-image"
                                className="mt-4 cursor-pointer rounded-lg border border-input-border px-4 py-2 text-sm font-medium text-text-muted transition hover:bg-card-hover"
                            >
                                Choose Profile Picture
                            </label>

                            <input
                                id="seller-image"
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="number"
                                className="mb-2 block text-sm font-medium text-text"
                            >
                                Phone Number
                            </label>

                            <input
                                id="number"
                                type="tel"
                                value={number}
                                onChange={(event) =>
                                    setNumber(event.target.value)
                                }
                                placeholder="Enter your phone number"
                                className="w-full rounded-lg border border-input-border bg-input-background px-4 py-3 text-sm text-text outline-none transition focus:border-primary"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="bio"
                                className="mb-2 block text-sm font-medium text-text"
                            >
                                Bio
                            </label>

                            <textarea
                                id="bio"
                                value={bio}
                                onChange={(event) =>
                                    setBio(event.target.value)
                                }
                                placeholder="Tell clients a little about yourself..."
                                rows={4}
                                className="w-full resize-none rounded-lg border border-input-border bg-input-background px-4 py-3 text-sm text-text outline-none transition focus:border-primary"
                            />
                        </div>

                        {error && (
                            <div
                                role="alert"
                                className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-500"
                            >
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-medium text-text-on-primary transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {loading
                                ? "Creating Account..."
                                : "Create Seller Account"}
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}