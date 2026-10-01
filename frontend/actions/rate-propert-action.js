'use server'

import RefreshTokenAction from '../data/tokens/refreshtoken'
import { revalidateTag } from 'next/cache'

export default async function RateProperty({property_id,rate}) {
    const accessToken = await RefreshTokenAction()
    const response = await fetch(
        `http://backend:8000/properties/rate/${property_id}/${rate}`,
        {
            method:'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    )
    if (response.ok){
        revalidateTag(`properties`);
        revalidateTag(`property-${property_id}`);
         return(true)
    }
   
}