"use server";

import RefreshTokenAction from "@/data/tokens/refreshtoken";
import { revalidateTag } from "next/cache";

export default async function AddPropertyImagesAction(
    propertyId,
    imagesFormData
) {
    const accessToken = await RefreshTokenAction();

    let response;
    let data;

    try {
        response = await fetch(
            `http://backend:8000/properties/add/images/${propertyId}`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                body: imagesFormData,
            }
        );

        data = await response.json();
    } catch {
        throw new Error(
            "Unable to upload property images. Please try again."
        );
    }

    if (!response.ok) {
        throw new Error(
            data.detail || "Unable to upload property images."
        );
    }
    revalidateTag(`properties`);
    return data;
}