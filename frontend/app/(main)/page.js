import HomePgaeComponent from "@/components/homepage/hompage"
import GetProperties from "@/data/properties/get-properties"
import GetWhoAmI from "@/data/profile/whoami";
import GetFavoritesId from "@/data/favorites/get-favorites-id";

export default async function HomePgae({searchParams}){
    const params = await searchParams;
    const category = params.category;
    const city = params.city;
    const room_numbers = params.room_number;
    const has_parking = params.has_parking;
    const rating = params.rating;
    const properties=await GetProperties({category,city,room_numbers,has_parking,rating})
    const user=await GetWhoAmI()
    var favoritesid=null
    if(user?.role==='client'){
        favoritesid=await GetFavoritesId()
    }
    return <HomePgaeComponent properties={properties} favoritesid={favoritesid}/>
}
