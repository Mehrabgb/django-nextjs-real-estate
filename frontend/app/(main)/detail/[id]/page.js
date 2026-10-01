import GetPropertyDetail from "@/data/properties/get-propert-detil"
import PropertyDetailComponent from "@/components/detailpage/detailpage"
import GetWhoAmI from "@/data/profile/whoami"
import GetFavoritesId from "@/data/favorites/get-favorites-id"

export async function generateMetadata({ params }) {
    const { id } = await params;

    const property = await GetPropertyDetail({id:id});

    return {
        title: property.title,
        description: property.description,
    };
}

export default async function DetailPage({params}){
    const {id}=await params
    const property=await GetPropertyDetail({id:id})
    const user=await GetWhoAmI()
    var favoritesid=null
    if(user?.role==='client'){
        favoritesid=await GetFavoritesId()
    }
    return <PropertyDetailComponent property={property} favoritesid={favoritesid}/>
}