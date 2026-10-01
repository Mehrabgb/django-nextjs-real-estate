"use server";

import RefreshTokenAction from "@/data/tokens/refreshtoken";

export default async function UpdateProfileImage(formData) {
    const accessToken = await RefreshTokenAction();

    const response = await fetch(
        "http://backend:8000/users/addprofileimage/",
        {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: formData,
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(JSON.stringify(data));
    }

    return data;
}