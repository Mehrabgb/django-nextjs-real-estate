"use server";

import RefreshTokenAction from "../data/tokens/refreshtoken";

export default async function MarkNotificationsRead(notif_id) {
    const accessToken = await RefreshTokenAction();

    const response = await fetch(
        `http://backend:8000/users/notifications/?id=${notif_id}`,
        {body:JSON.stringify({is_read : "True"}),
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );

    if (!response.ok) {
        const data = await response.json();
        throw new Error(JSON.stringify(data));
    }

    return await response.json();
}