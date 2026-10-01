'use server'

import RefreshTokenAction from '../data/tokens/refreshtoken'
import { revalidateTag } from 'next/cache'

export default async function AddToFavorites({property_id}) {
    const accessToken = await RefreshTokenAction()
    const response = await fetch(
        'http://backend:8000/users/favorites/',
        {
            method:'POST',
            body:JSON.stringify({property_id: property_id}),
            headers: {
                'Content-type' : 'application/json',
                Authorization: `Bearer ${accessToken}`
            }
        }
    )
    if(response.ok){
        revalidateTag(`properties`);
        revalidateTag(`property-${property_id}`);
    }
}