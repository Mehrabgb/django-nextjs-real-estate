"use client";

import { useState } from "react";
import AddToFavorites from "@/actions/add-to-favorites-action";
import RemoveFromFavorites from "@/actions/remove-from-favorites-action";

export default function FavoritesButton({property_id,favoritesid}) {
    if(favoritesid===null){
        return null
    }
    const [isFavorite, setIsFavorite] = useState(
        favoritesid.includes(property_id)
    );
    const [loading, setLoading] = useState(false);

    async function handleFavorite() {
        if (loading) {
            return;
        }

        setLoading(true);

        try {
            if(isFavorite){
                await RemoveFromFavorites({ property_id })
            }else{
                await AddToFavorites({ property_id })
            }

            setIsFavorite((current) => !current);
        } catch (error) {
            console.error("Failed to update favorite:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <button
            onClick={handleFavorite}
            type="button"
            disabled={loading}
            aria-label={
                isFavorite
                    ? "Remove from favorites"
                    : "Add to favorites"
            }
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-xl transition
                ${
                    isFavorite
                        ? "border-danger/30 bg-danger/10 text-danger"
                        : "border-border text-text-muted hover:bg-card-hover hover:text-danger"
                }
                ${loading ? "cursor-wait opacity-60" : ""}
            `}
        >
            {isFavorite ? "♥" : "♡"}
        </button>
    );
}