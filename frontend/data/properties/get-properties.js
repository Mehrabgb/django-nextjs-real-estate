'use server'

export default async function GetProperties(params){
    const query = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
        if (value){
            query.set(key, value);
        }
    }
    const response=await fetch(`http://backend:8000/properties/?${query.toString()}`,
     {
    next: {
        revalidate: 300,
        tags: ["properties"],
    },
})
    const data=await response.json()
    return data
}