import PropertyFilter from "./filtering"
import PropertyItem from "./property-item"

export default function HomePgaeComponent({properties,favoritesid}){
    return <main>
        <PropertyFilter/>
        <section className="mx-auto max-w-8xl space-y-4 px-4 py-6">
            {properties.map(property => <PropertyItem key={property.id} favoritesid={favoritesid} property={property}/>)}
        </section>
    </main>
}
