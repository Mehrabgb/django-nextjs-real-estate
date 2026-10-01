import FavoriteItem from "./favorite-item"

export default function FavoritesPageComponent({favorites,favoritesid}){
    return <main>
            <header></header>
            <section className="mx-auto max-w-8xl space-y-4 px-4 py-6">
                {favorites.map(favorite => <FavoriteItem key={favorite.id} favorite={favorite} favoritesid={favoritesid}/>)}
            </section>
        </main>
}