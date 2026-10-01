import Link from "next/link";
import DeletePropertyButton from "@/components/bottons/delete";

export default async function MyPropertiesPageComponent({properties}) {
    

    return (
        <main className="mx-auto max-w-7xl px-4 py-8">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-text">
                        My Properties
                    </h1>

                    <p className="mt-1 text-sm text-text-muted">
                        Manage the properties you have listed.
                    </p>
                </div>

                <Link
                    href="/create/property"
                    className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-text-on-primary transition hover:bg-primary-hover"
                >
                    Add Property
                </Link>
            </div>

            {properties.length === 0 ? (
                <div className="rounded-xl border border-dashed border-border p-12 text-center">
                    <h2 className="text-lg font-semibold text-text">
                        You don't have any properties yet
                    </h2>

                    <p className="mt-2 text-sm text-text-muted">
                        Add your first property to start listing it.
                    </p>

                    <Link
                        href="/create/property"
                        className="mt-5 inline-block rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-text-on-primary"
                    >
                        Add Property
                    </Link>
                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {properties.map((property) => (
                        <div
                            key={property.id}
                            className="overflow-hidden rounded-xl border border-border bg-card"
                        >
                            <div className="aspect-video overflow-hidden bg-surface-muted">
                                {property.main_image ? (
                                    <img
                                        src={property.main_image}
                                        alt={property.title}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center text-sm text-text-muted">
                                        No image
                                    </div>
                                )}
                            </div>

                            <div className="p-4">
                                <h2 className="truncate font-semibold text-text">
                                    {property.title}
                                </h2>

                                <div className="mt-2 flex gap-3 text-sm text-text-muted">
                                    <span>
                                        {property.size} m²
                                    </span>

                                    <span>
                                        {property.room_numbers} rooms
                                    </span>
                                </div>

                                <div className="mt-4 flex items-center justify-between">
                                    <Link
                                        href={`/detail/${property.id}`}
                                        className="text-sm font-medium text-primary hover:underline"
                                    >
                                        View Property
                                    </Link>

                                    <DeletePropertyButton
                                        propertyId={property.id}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}