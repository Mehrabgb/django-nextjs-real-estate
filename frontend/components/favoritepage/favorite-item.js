import Image from "next/image";
import Link from "next/link";
import FavoritesButton from "../bottons/favorite";

export default function FavoriteItem({ favorite,favoritesid}) {
    const property = favorite.property;

    return (
        <div className="group flex overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:-translate-y-0.5 hover:bg-card-hover hover:shadow-md">
        
                    {/* Image */}
                    <div className="relative h-64 w-80 shrink-0 overflow-hidden">
                        <Image
                            src={property.main_image || "/no-image.png"}
                            alt={property.title}
                            fill
                            sizes="320px"
                            className="object-cover transition duration-300 group-hover:scale-105"
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
        
                            <FavoritesButton property_id={property.id} favoritesid={favoritesid}/>
                            
        
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
                                
                                <Image
                                    src={property.seller?.image || "/no-profile.png"}
                                    alt={property.seller?.username || "Seller"}
                                    width={40}
                                    height={40}
                                    sizes="40px"
                                    className="mr-3 h-10 w-10 rounded-full bg-surface-muted p-0.5 object-cover hover:bg-primary-hover"
                                />
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