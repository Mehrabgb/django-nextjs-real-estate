'use server'

import RefreshTokenAction from "../tokens/refreshtoken"

export default async function GetNotificationsCount(){
    const accessToken=await RefreshTokenAction()
    const response=await fetch(`http://backend:8000/users/notifications/count`,
        {cache: "no-store",
            headers: {
                Authorization: `Bearer ${accessToken}`
            }}
    )
    const data=await response.json()
    return data
}