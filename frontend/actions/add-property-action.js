"use server";

import RefreshTokenAction from "@/data/tokens/refreshtoken";
import { revalidateTag } from "next/cache";

export default async function CreatePropertyAction(formData) {
    const accessToken = await RefreshTokenAction();

    let response;
    let data;

    try {
        response = await fetch(
            "http://backend:8000/properties/create/property",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                body: formData,
            }
        );

        data = await response.json();
    } catch {
        throw new Error(
            "Unable to connect to the server. Please try again."
        );
    }

    if (!response.ok) {
        throw new Error(
            data.detail || "Unable to create property."
        );
    }
    revalidateTag(`properties`);
    return data;
}