import PropertyItem from "../homepage/property-item";

export default function SellerInfoPageComponent({ sellerinfo, favoritesid }) {
    return (
        <main className="mx-auto max-w-8xl px-4 py-8 sm:px-6 lg:px-8">

            {/* Seller Profile */}
            <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">

                <div className="p-6 sm:p-8">
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-center">

                        {/* Seller image */}
                        <div className="h-24 w-24 shrink-0 overflow-hidden rounded-full border-4 border-surface-muted bg-surface-muted">
                            <img
                                src={sellerinfo.image || "/no-image.png"}
                                alt={sellerinfo.username}
                                className="h-full w-full object-cover"
                            />
                        </div>

                        {/* Seller information */}
                        <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-primary">
                                Property Seller
                            </p>

                            <h1 className="mt-1 text-3xl font-bold text-text">
                                {sellerinfo.username}
                            </h1>

                            {sellerinfo.bio && (
                                <p className="mt-3 max-w-2xl leading-6 text-text-muted">
                                    {sellerinfo.bio}
                                </p>
                            )}

                            {sellerinfo.number && (
                                <p className="mt-3 text-sm text-text-muted">
                                    📞 {sellerinfo.number}
                                </p>
                            )}
                        </div>

                        {/* Property count */}
                        <div className="shrink-0 rounded-xl border border-border bg-surface-muted px-7 py-4 text-center">
                            <p className="text-2xl font-bold text-text">
                                {sellerinfo.properties.length}
                            </p>

                            <p className="mt-1 text-sm text-text-muted">
                                Properties
                            </p>
                        </div>

                    </div>
                </div>
            </section>


            {/* Seller Properties */}
            <section className="mt-10">

                <div className="mb-5">
                    <h2 className="text-2xl font-bold text-text">
                        Properties by {sellerinfo.username}
                    </h2>

                    <p className="mt-1 text-sm text-text-muted">
                        Browse all properties listed by this seller.
                    </p>
                </div>

                {sellerinfo.properties.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center">
                        <h3 className="text-lg font-semibold text-text">
                            No properties listed
                        </h3>

                        <p className="mt-2 text-sm text-text-muted">
                            This seller hasn't listed any properties yet.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {sellerinfo.properties.map((propertie) => (
                            <PropertyItem
                                key={propertie.id}
                                property={propertie}
                                favoritesid={favoritesid}
                            />
                        ))}
                    </div>
                )}

            </section>

        </main>
    );
}