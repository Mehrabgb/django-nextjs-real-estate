import GetFavorites from "@/data/favorites/get-favorites"
import FavoritesPageComponent from "@/components/favoritepage/favoritpage"
import GetWhoAmI from "@/data/profile/whoami"
import GetFavoritesId from "@/data/favorites/get-favorites-id"

export const metadata = {
    title: "Favorites",
    description: "View and manage your favorite properties.",
};

export default async function FavoritesPage(){
    const favorites=await GetFavorites()
    const user=await GetWhoAmI()
    var favoritesid=null
    if(user?.role==='client'){
        favoritesid=await GetFavoritesId()
    }
    return <FavoritesPageComponent favorites={favorites} favoritesid={favoritesid}/>
}