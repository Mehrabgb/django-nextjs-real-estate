"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cities } from "./all-cities-data";

export default function PropertyFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();

    function handleFilter(event) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const params = new URLSearchParams();

        const category = formData.get("category");
        const city = formData.get("city");
        const rooms = formData.get("rooms");
        const parking = formData.get("parking");
        const rating = formData.get("rating");

        if (category) {
            params.set("category", category);
        }

        if (city) {
            params.set("city", city);
        }

        if (rooms) {
            params.set("room_number", rooms);
        }

        if (parking) {
            params.set("has_parking", parking);
        }

        if (rating) {
            params.set("rating", rating);
        }

        router.push(`/?${params.toString()}`);
    }

    function resetFilters() {
        router.push("/");
    }

    return (
        <form
            onSubmit={handleFilter}
            className="rounded-b-2xl border border-border bg-card p-5 shadow-sm"
        >
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                

                <select
                    name="category"
                    defaultValue={searchParams.get("category") || ""}
                    className="rounded-lg border border-input-border bg-input-background px-3 py-2 text-sm text-text"
                >
                    <option value="">All categories</option>
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                    <option value="villa">Villa</option>
                    <option value="office">Office</option>
                    <option value="land">Land</option>
                </select>


                <select
                    name="city"
                    defaultValue={searchParams.get("city") || ""}
                    className="max-h-60 overflow-y-auto rounded-lg border border-input-border bg-input-background px-3 py-2 text-sm text-text"
                >
                    <option value="">All cities</option>

                    {cities.map((city) => (
                        <option key={city.value} value={city.value}>
                            {city.label}
                        </option>
                    ))}
                </select>


                <select
                    name="rooms"
                    defaultValue={searchParams.get("room_number") || ""}
                    className="rounded-lg border border-input-border bg-input-background px-3 py-2 text-sm text-text"
                >
                    <option value="">Any rooms</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                </select>


                <select
                    name="parking"
                    defaultValue={searchParams.get("has_parking") || ""}
                    className="rounded-lg border border-input-border bg-input-background px-3 py-2 text-sm text-text"
                >
                    <option value="">Parking</option>
                    <option value="True">Has parking</option>
                    <option value="False">No parking</option>
                </select>


                <select
                    name="rating"
                    defaultValue={searchParams.get("rating") || ""}
                    className="rounded-lg border border-input-border bg-input-background px-3 py-2 text-sm text-text"
                >
                    <option value="">Any rating</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                    <option value="4.5">4.5+</option>
                </select>

            </div>


            <div className="mt-4 flex gap-3">
                <button
                    type="submit"
                    className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-text-on-primary hover:bg-primary-hover"
                >
                    Apply Filters
                </button>

                <button
                    type="button"
                    onClick={resetFilters}
                    className="rounded-lg border border-input-border px-5 py-2.5 text-sm font-medium text-text-muted hover:bg-card-hover"
                >
                    Reset
                </button>
            </div>
        </form>
    );
}
