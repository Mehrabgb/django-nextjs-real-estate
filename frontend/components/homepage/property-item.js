import Image from "next/image";
import Link from "next/link";
import FavoritesBotton from "../bottons/favorite";
import PropertyImagePreview from "./property-pimage-preview";

export default function PropertyItem({ property,favoritesid }) {
    const propertyImages = [
    property.main_image,
    ...(property.images?.map((image) => image.image) || []),
    ].filter(Boolean);
    return (
        <div className="group flex overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:-translate-y-0.5 hover:bg-card-hover hover:shadow-md">

            {/* Image */}
            <div className="relative h-64 w-130 shrink-0 overflow-hidden">
                <PropertyImagePreview
                    images={propertyImages}
                    title={property.title}
                />

                <span className="absolute left-4 top-4 rounded-full bg-surface/90 px-3 py-1 text-sm font-medium text-text backdrop-blur">
                    {property.category}
                </span>
            </div>


            {/* Content */}
            <div className="flex min-w-0 flex-1 flex-col p-5">

                {/* Title + Favorite */}
                <div className="flex items-start justify-between gap-4">

                    <h2 className="truncate text-xl font-semibold text-text">
                        {property.title}
                    </h2>

                    <FavoritesBotton property_id={property.id} favoritesid={favoritesid}/>

                </div>


                {/* Address */}
                <p className="mt-2 line-clamp-1 text-sm text-text-muted">
                    📍 {property.address}
                </p>


                {/* Description */}
                <p className="mt-4 line-clamp-2 text-sm leading-6 text-text-muted">
                    {property.description}
                </p>


                {/* Property details */}
                <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm">

                    <div>
                        <span className="text-text-muted">
                            Size
                        </span>
                        <p className="font-medium text-text">
                            {property.size} m²
                        </p>
                    </div>

                    <div>
                        <span className="text-text-muted">
                            Rooms
                        </span>
                        <p className="font-medium text-text">
                            {property.room_numbers}
                        </p>
                    </div>

                    <div>
                        <span className="text-text-muted">
                            Parking
                        </span>
                        <p className="font-medium text-text">
                            {property.has_parking ? "Yes" : "No"}
                        </p>
                    </div>

                    <div>
                        <span className="text-text-muted">
                            Rating
                        </span>
                        <p className="font-medium text-text">
                            ⭐ {property.rating}
                        </p>
                    </div>

                </div>


                {/* Bottom */}
                <div className="mt-auto flex items-end justify-between pt-5">

                    <Link href={`/seller/${property.seller?.id}`} className="flex items-center">

                        <Image src={property.seller?.image}
                        alt={property.seller?.username}
                        height={20}
                        width={20}
                        className="h-10 w-10 rounded-full mr-3 p-0.5 bg-surface-muted hover:bg-primary-hover"/>

                        <p className="font-medium text-text ">
                            {property.seller?.username}
                        </p>
                        
                    </Link>

                    <Link
                        href={`/detail/${property.id}`}
                        className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-text-on-primary transition hover:bg-primary-hover"
                    >
                        View Property
                    </Link>

                </div>

            </div>
        </div>
    );
}

