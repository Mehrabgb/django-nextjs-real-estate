"use server";

import RefreshTokenAction from "@/data/tokens/refreshtoken";
import { revalidateTag } from "next/cache";

export default async function DeletePropertyAction(propertyId) {
    const accessToken = await RefreshTokenAction();

    const response = await fetch(
        `http://backend:8000/properties/delete/${propertyId}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );

    if (!response.ok) {
        let data;

        try {
            data = await response.json();
        } catch {
            data = {
                message: "Failed to delete property",
            };
        }

        throw new Error(JSON.stringify(data));
    }
    rrevalidateTag(`properties`);
    return true;
}