import Image from "next/image";
import RatingModal from "../bottons/rating-modal";
import FavoritesButton from "../bottons/favorite";

export default function PropertyDetailComponent({ property, favoritesid }) {
    const allImages = [
        ...(property.main_image
            ? [{ id: "main", image: property.main_image }]
            : []),
        ...(property.images || []),
    ];

    return (
        <div className="mx-auto max-w-8xl px-4 py-8 sm:px-6 lg:px-8">

            {/* Image Gallery */}
            <section>
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">

                    {/* Main Image */}
                    <div className="relative aspect-video overflow-hidden rounded-2xl md:col-span-2">
                        <Image
                            src={property.main_image || "/no-image.png"}
                            alt={property.title}
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover transition duration-300 hover:scale-105"
                        />
                    </div>

                    {/* Other Images */}
                    {property.images?.slice(0, 4).map((image) => (
                        <div
                            key={image.id}
                            className="relative aspect-video overflow-hidden rounded-xl"
                        >
                            <Image
                                src={image.image}
                                alt={property.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 25vw"
                                className="object-cover transition duration-300 hover:scale-105"
                            />
                        </div>
                    ))}

                </div>
            </section>


            {/* Property Header */}
            <section className="mt-8 border-b border-border pb-6">

                <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">

                    {/* Title Information */}
                    <div className="min-w-0">

                        <h1 className="mt-3 text-3xl font-bold text-text sm:text-4xl">
                            {property.title}
                        </h1>

                        <p className="mt-3 text-text-muted">
                            📍 {property.address}
                        </p>

                    </div>


                    {/* Rating + Actions */}
                    <div className="flex shrink-0 items-center gap-3">

                        {/* Current Rating */}
                        <div className="rounded-xl bg-surface-muted px-4 py-2">
                            <span className="text-accent">
                                ★
                            </span>

                            <span className="ml-1 font-semibold text-text">
                                {property.rating}
                            </span>

                            <span className="ml-1 text-sm text-text-muted">
                                ({property.rating_times})
                            </span>
                        </div>

                        {/* Rate Button + Modal */}
                        {favoritesid && (
                            <RatingModal propertyId={property.id} />
                        )}

                        {/* Favorite */}
                        <FavoritesButton
                            property_id={property.id}
                            favoritesid={favoritesid}
                        />

                    </div>

                </div>

            </section>


            {/* Property Information */}
            <section className="mt-10">

                <h2 className="text-2xl font-semibold text-text">
                    Property Information
                </h2>

                <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">

                    <InfoItem
                        label="Size"
                        value={`${property.size} m²`}
                    />

                    <InfoItem
                        label="Rooms"
                        value={property.room_numbers}
                    />

                    <InfoItem
                        label="Building Age"
                        value={`${property.building_age} years`}
                    />

                    <InfoItem
                        label="Parking"
                        value={property.has_parking ? "Yes" : "No"}
                    />

                    <InfoItem
                        label="Category"
                        value={property.category}
                    />

                </div>

            </section>


            {/* Description */}
            <section className="mt-10">

                <h2 className="text-2xl font-semibold text-text">
                    Description
                </h2>

                <div className="mt-4 max-w-4xl rounded-xl border border-border bg-card p-5">
                    <p className="whitespace-pre-line leading-7 text-text-muted">
                        {property.description}
                    </p>
                </div>

            </section>


            {/* Location */}
            <section className="mt-10">

                <h2 className="text-2xl font-semibold text-text">
                    Location
                </h2>

                <div className="mt-4 rounded-xl border border-border bg-card p-5">
                    <p className="text-text-muted">
                        📍 {property.address}
                    </p>
                </div>

            </section>


            {/* Seller */}
            {property.seller && (
                <section className="mt-10">

                    <h2 className="text-2xl font-semibold text-text">
                        Seller
                    </h2>

                    <div className="mt-4 flex flex-col gap-4 rounded-xl border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between">

                        <div>
                            <p className="font-semibold text-text">
                                {property.seller.username}
                            </p>

                            {property.seller.number && (
                                <p className="mt-1 text-sm text-text-muted">
                                    📞 {property.seller.number}
                                </p>
                            )}
                        </div>

                    </div>

                </section>
            )}


            {/* All Images */}
            {allImages.length > 0 && (
                <section className="mt-10">

                    <h2 className="text-2xl font-semibold text-text">
                        All Photos
                    </h2>

                    <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

                        {allImages.map((image) => (
                            <div
                                key={image.id}
                                className="relative aspect-video overflow-hidden rounded-xl"
                            >
                                <Image
                                    src={image.image}
                                    alt={property.title}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className="object-cover transition duration-300 hover:scale-105"
                                />
                            </div>
                        ))}

                    </div>

                </section>
            )}

        </div>
    );
}


function InfoItem({ label, value }) {
    return (
        <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-sm text-text-muted">
                {label}
            </p>

            <p className="mt-1 font-semibold text-text">
                {value}
            </p>
        </div>
    );
}
