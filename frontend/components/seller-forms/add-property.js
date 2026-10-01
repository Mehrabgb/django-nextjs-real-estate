"use client";

import { useState } from "react";
import Image from "next/image";
import CreatePropertyAction from "@/actions/add-property-action"
import AddPropertyImagesAction from "@/actions/add-property-images-action";
import { useRouter } from "next/navigation";

const cities = [
    [1, "Tehran"],
    [2, "Mashhad"],
    [3, "Isfahan"],
    [4, "Shiraz"],
    [5, "Tabriz"],
    [6, "Karaj"],
    [7, "Qom"],
    [8, "Ahvaz"],
    [9, "Kermanshah"],
    [10, "Rasht"],
    [11, "Urmia"],
    [12, "Yazd"],
    [13, "Arak"],
    [14, "Hamadan"],
    [15, "Kerman"],
    [16, "Qazvin"],
    [17, "Zahedan"],
    [18, "Sanandaj"],
    [19, "Bandar Abbas"],
    [20, "Sari"],
];

const categories = [
    ["apartment", "Apartment"],
    ["house", "House"],
    ["villa", "Villa"],
    ["office", "Office"],
    ["land", "Land"],
];

export default function AddPropertyComponent() {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [city, setCity] = useState("");
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");
    const [size, setSize] = useState("");
    const [buildingAge, setBuildingAge] = useState("");
    const [roomNumbers, setRoomNumbers] = useState("");
    const [hasParking, setHasParking] = useState(false);

    const [mainImage, setMainImage] = useState(null);
    const [mainImagePreview, setMainImagePreview] = useState(null);

    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    function handleMainImageChange(event) {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        setMainImage(file);
        setMainImagePreview(URL.createObjectURL(file));
    }

    function handleImagesChange(event) {
        const files = Array.from(event.target.files || []);

        if (!files.length) {
            return;
        }

        setImages(files);
        setImagePreviews(
            files.map((file) => URL.createObjectURL(file))
        );
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setError("");

        if (!title.trim()) {
            setError("Title is required.");
            return;
        }

        if (!category) {
            setError("Category is required.");
            return;
        }

        if (!city) {
            setError("City is required.");
            return;
        }

        if (!description.trim()) {
            setError("Description is required.");
            return;
        }

        if (!address.trim()) {
            setError("Address is required.");
            return;
        }

        if (!size) {
            setError("Size is required.");
            return;
        }

        if (!mainImage) {
            setError("Main image is required.");
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();

            formData.append("title", title);
            formData.append("category", category);
            formData.append("city", city);
            formData.append("description", description);
            formData.append("address", address);
            formData.append("size", size);
            formData.append("building_age", buildingAge || 0);
            formData.append("room_numbers", roomNumbers || 0);
            formData.append("has_parking", hasParking);

            if (mainImage) {
                formData.append("main_image", mainImage);
            }

            const property = await CreatePropertyAction(formData);

            if (images.length > 0) {
                const imagesFormData = new FormData();

                images.forEach((image) => {
                    imagesFormData.append("images", image);
                });

                await AddPropertyImagesAction(
                    property.id,
                    imagesFormData
                );
            }

            router.push("/");
            // Handle successful creation here.
        } catch (error) {
            setError(
                error.message || "Failed to create property."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen bg-background px-4 py-10">
            <div className="mx-auto max-w-4xl">
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">

                    <div>
                        <h1 className="text-2xl font-bold text-text">
                            Add Property
                        </h1>

                        <p className="mt-2 text-sm text-text-muted">
                            Add your property information and images.
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="mt-8 space-y-8"
                    >
                        {/* Basic information */}
                        <section>
                            <h2 className="text-lg font-semibold text-text">
                                Basic Information
                            </h2>

                            <div className="mt-4 grid gap-5 sm:grid-cols-2">

                                {/* Title */}
                                <div className="sm:col-span-2">
                                    <label
                                        htmlFor="title"
                                        className="mb-2 block text-sm font-medium"
                                    >
                                        Title
                                    </label>

                                    <input
                                        id="title"
                                        type="text"
                                        value={title}
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        }
                                        placeholder="Modern apartment in Tehran"
                                        className="w-full rounded-lg border border-input-border bg-input-background px-4 py-3 text-sm text-text outline-none focus:border-primary"
                                    />
                                </div>

                                {/* Category */}
                                <div>
                                    <label
                                        htmlFor="category"
                                        className="mb-2 block text-sm font-medium"
                                    >
                                        Category
                                    </label>

                                    <select
                                        id="category"
                                        value={category}
                                        onChange={(e) =>
                                            setCategory(e.target.value)
                                        }
                                        className="w-full rounded-lg border border-input-border bg-input-background px-4 py-3 text-sm text-text outline-none focus:border-primary"
                                    >
                                        <option value="">
                                            Select category
                                        </option>

                                        {categories.map(
                                            ([value, label]) => (
                                                <option
                                                    key={value}
                                                    value={value}
                                                >
                                                    {label}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>

                                {/* City */}
                                <div>
                                    <label
                                        htmlFor="city"
                                        className="mb-2 block text-sm font-medium"
                                    >
                                        City
                                    </label>

                                    <select
                                        id="city"
                                        value={city}
                                        onChange={(e) =>
                                            setCity(e.target.value)
                                        }
                                        className="w-full rounded-lg border border-input-border bg-input-background px-4 py-3 text-sm text-text outline-none focus:border-primary"
                                    >
                                        <option value="">
                                            Select city
                                        </option>

                                        {cities.map(
                                            ([value, label]) => (
                                                <option
                                                    key={value}
                                                    value={value}
                                                >
                                                    {label}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>

                                {/* Size */}
                                <div>
                                    <label
                                        htmlFor="size"
                                        className="mb-2 block text-sm font-medium"
                                    >
                                        Size (m²)
                                    </label>

                                    <input
                                        id="size"
                                        type="number"
                                        min="1"
                                        value={size}
                                        onChange={(e) =>
                                            setSize(e.target.value)
                                        }
                                        placeholder="120"
                                        className="w-full rounded-lg border border-input-border bg-input-background px-4 py-3 text-sm text-text outline-none focus:border-primary"
                                    />
                                </div>

                                {/* Building age */}
                                <div>
                                    <label
                                        htmlFor="building-age"
                                        className="mb-2 block text-sm font-medium"
                                    >
                                        Building Age
                                    </label>

                                    <input
                                        id="building-age"
                                        type="number"
                                        min="0"
                                        value={buildingAge}
                                        onChange={(e) =>
                                            setBuildingAge(e.target.value)
                                        }
                                        placeholder="5"
                                        className="w-full rounded-lg border border-input-border bg-input-background px-4 py-3 text-sm text-text outline-none focus:border-primary"
                                    />
                                </div>

                                {/* Rooms */}
                                <div>
                                    <label
                                        htmlFor="rooms"
                                        className="mb-2 block text-sm font-medium"
                                    >
                                        Number of Rooms
                                    </label>

                                    <input
                                        id="rooms"
                                        type="number"
                                        min="0"
                                        value={roomNumbers}
                                        onChange={(e) =>
                                            setRoomNumbers(e.target.value)
                                        }
                                        placeholder="3"
                                        className="w-full rounded-lg border border-input-border bg-input-background px-4 py-3 text-sm text-text outline-none focus:border-primary"
                                    />
                                </div>

                                {/* Parking */}
                                <div className="flex items-center gap-3 self-end pb-3">
                                    <input
                                        id="parking"
                                        type="checkbox"
                                        checked={hasParking}
                                        onChange={(e) =>
                                            setHasParking(e.target.checked)
                                        }
                                        className="h-4 w-4 rounded"
                                    />

                                    <label
                                        htmlFor="parking"
                                        className="text-sm font-medium"
                                    >
                                        Has parking
                                    </label>
                                </div>
                            </div>
                        </section>

                        {/* Address */}
                        <section>
                            <h2 className="text-lg font-semibold text-text">
                                Location
                            </h2>

                            <div className="mt-4">
                                <label
                                    htmlFor="address"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    Address
                                </label>

                                <textarea
                                    id="address"
                                    rows={3}
                                    value={address}
                                    onChange={(e) =>
                                        setAddress(e.target.value)
                                    }
                                    placeholder="Enter the property address..."
                                    className="w-full resize-none rounded-lg border border-input-border bg-input-background px-4 py-3 text-sm text-text outline-none focus:border-primary"
                                />
                            </div>
                        </section>

                        {/* Description */}
                        <section>
                            <h2 className="text-lg font-semibold text-text">
                                Description
                            </h2>

                            <div className="mt-4">
                                <textarea
                                    rows={6}
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    placeholder="Describe the property..."
                                    className="w-full resize-none rounded-lg border border-input-border bg-input-background px-4 py-3 text-sm text-text outline-none focus:border-primary"
                                />
                            </div>
                        </section>

                        {/* Main image */}
                        <section>
                            <h2 className="text-lg font-semibold text-text">
                                Main Image
                            </h2>

                            <div className="mt-4">
                                {mainImagePreview && (
                                    <div className="relative mb-4 h-64 overflow-hidden rounded-xl">
                                        <Image
                                            src={mainImagePreview}
                                            alt="Main property preview"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}

                                <label
                                    htmlFor="main-image"
                                    className="inline-flex cursor-pointer rounded-lg border border-input-border px-4 py-2 text-sm font-medium text-text transition hover:bg-card-hover"
                                >
                                    Choose Main Image
                                </label>

                                <input
                                    id="main-image"
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp"
                                    onChange={handleMainImageChange}
                                    className="hidden"
                                />
                            </div>
                        </section>

                        {/* Additional images */}
                        <section>
                            <h2 className="text-lg font-semibold text-text">
                                Additional Images
                            </h2>

                            <p className="mt-1 text-sm text-text-muted">
                                You can select multiple images.
                            </p>

                            <div className="mt-4">
                                <label
                                    htmlFor="property-images"
                                    className="inline-flex cursor-pointer rounded-lg border border-input-border px-4 py-2 text-sm font-medium text-text transition hover:bg-card-hover"
                                >
                                    Choose Images
                                </label>

                                <input
                                    id="property-images"
                                    type="file"
                                    multiple
                                    accept="image/jpeg,image/png,image/webp"
                                    onChange={handleImagesChange}
                                    className="hidden"
                                />

                                {imagePreviews.length > 0 && (
                                    <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                                        {imagePreviews.map(
                                            (src, index) => (
                                                <div
                                                    key={src}
                                                    className="relative aspect-square overflow-hidden rounded-lg"
                                                >
                                                    <Image
                                                        src={src}
                                                        alt={`Property image ${index + 1}`}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            )
                                        )}
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* Error */}
                        {error && (
                            <div className="rounded-lg bg-danger/10 px-4 py-3 text-sm text-danger">
                                {error}
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-lg bg-primary px-4 py-3 font-medium text-text-on-primary transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {loading
                                ? "Creating Property..."
                                : "Create Property"}
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}