'use server'

export default async function GetSellerProperties({seller_id}){
    
    const response=await fetch(`http://backend:8000/users/seller/info/${seller_id}`,
        {
    next: {
        revalidate: 300,
        tags: ["properties"],
    },
})
    const data=await response.json()
    return data
}