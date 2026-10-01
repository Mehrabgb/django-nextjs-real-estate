'use server'


export default async function GetPropertyDetail({id}){
    const response=await fetch(`http://backend:8000/properties/detail/${id}`,{
    next: {
        revalidate: 300,
        tags: [`property-${id}`],
    },
})
    const data=await response.json()
    return data
}