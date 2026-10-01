"use client";

import RateProperty from "@/actions/rate-propert-action";
import { useState } from "react";

export default function RatingModal({ propertyId }) {
    const [isOpen, setIsOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [loading, setLoading] = useState(false);

    async function handleSubmit() {
        if (!rating) return;

        setLoading(true);

        try {
            const response=await RateProperty({property_id: propertyId,rate: rating})
            if (response=== true){

            setIsOpen(false);
            setRating(0);
            }
        } catch (error) {
            console.error("Rating error:", error);
        } finally {
            setLoading(false);
        }
    }

    function closeModal() {
        if (loading) return;

        setIsOpen(false);
        setRating(0);
        setHover(0);
    }

    return (
        <>
            {/* Button that opens the modal */}
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-text-on-primary transition hover:bg-primary-hover"
            >
                Rate this property
            </button>

            {/* Modal */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-overlay px-4"
                    onClick={closeModal}
                >
                    <div
                        className="w-full max-w-md rounded-2xl bg-surface p-6 shadow-2xl"
                        onClick={(event) => event.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-text">
                                Rate this property
                            </h2>

                            <button
                                type="button"
                                onClick={closeModal}
                                className="text-2xl text-text-muted hover:text-text"
                            >
                                ×
                            </button>
                        </div>

                        {/* Stars */}
                        <div className="mt-8 flex justify-center gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHover(star)}
                                    onMouseLeave={() => setHover(0)}
                                    className="text-4xl transition-transform hover:scale-110"
                                    aria-label={`Rate ${star} out of 5`}
                                >
                                    <span
                                        className={
                                            star <= (hover || rating)
                                                ? "text-accent"
                                                : "text-border"
                                        }
                                    >
                                        ★
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* Selected rating */}
                        <div className="mt-4 text-center">
                            {rating > 0 ? (
                                <p className="text-text-muted">
                                    Your rating:{" "}
                                    <span className="font-semibold text-text">
                                        {rating}/5
                                    </span>
                                </p>
                            ) : (
                                <p className="text-text-muted">
                                    Select a rating
                                </p>
                            )}
                        </div>

                        {/* Buttons */}
                        <div className="mt-8 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={closeModal}
                                disabled={loading}
                                className="rounded-lg border border-input-border px-4 py-2 text-sm font-medium text-text-muted hover:bg-card-hover disabled:opacity-50"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={!rating || loading}
                                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-text-on-primary hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {loading ? "Submitting..." : "Submit"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}