"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DeletePropertyAction from "@/actions/delete-property";

export default function DeletePropertyButton({ propertyId }) {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    async function handleDelete() {
        const confirmed = window.confirm(
            "Are you sure you want to delete this property?"
        );

        if (!confirmed) {
            return;
        }

        setLoading(true);

        try {
            await DeletePropertyAction(propertyId);

            router.refresh();
        } catch (error) {
            console.error(error);
            alert("Failed to delete property.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="rounded-lg border border-danger/30 px-4 py-2 text-sm font-medium text-danger transition hover:bg-danger/10 disabled:cursor-not-allowed disabled:opacity-50"
        >
            {loading ? "Deleting..." : "Delete"}
        </button>
    );
}