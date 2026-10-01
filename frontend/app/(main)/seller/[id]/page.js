import SellerInfoPageComponent from "@/components/seller-info/seller-infopage"
import GetSellerProperties from "@/data/properties/get-seller-properties"
import GetWhoAmI from "@/data/profile/whoami"
import GetFavoritesId from "@/data/favorites/get-favorites-id"

export async function generateMetadata({ params }) {
    const { id } = await params;

    const sellerinfo = await GetSellerProperties({seller_id: id});

    return {
        title: sellerinfo?.username
            ? `${sellerinfo.username}'s Properties`
            : "Seller Profile",
        description: sellerinfo?.username
            ? `View properties listed by ${sellerinfo.username}.`
            : "View this seller's properties.",
    };
}

export default async function SellerInfoPage({params}){
    const {id}=await params
    const sellerinfo=await GetSellerProperties({seller_id:id})
    const user=await GetWhoAmI()
    var favoritesid=null
    if(user?.role==='client'){
        favoritesid=await GetFavoritesId()
    }
    return <SellerInfoPageComponent sellerinfo={sellerinfo} favoritesid={favoritesid}/>
}