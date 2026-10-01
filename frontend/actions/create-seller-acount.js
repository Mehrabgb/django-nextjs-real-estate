"use server";

import RefreshTokenAction from "@/data/tokens/refreshtoken";
import { redirect } from "next/navigation";

export default async function CreateSellerAction(formData) {
    const accessToken = await RefreshTokenAction();

    let response;
    let data;

    try {
        response = await fetch(
            "http://backend:8000/users/create/seller",
            {
                method: "PATCH",
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
            data.detail || "Unable to create seller account."
        );
    }

    redirect("/");
}