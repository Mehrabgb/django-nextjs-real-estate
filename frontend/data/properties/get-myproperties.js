import { cache } from "react";
import RefreshTokenAction from "@/data/tokens/refreshtoken";

const GetMyProperties = cache(async function GetMyProperties() {
    const accessToken = await RefreshTokenAction();

    const response = await fetch(
        "http://backend:8000/properties/myproperty",
        {
            headers: {
                
                Authorization: `Bearer ${accessToken}`,
            },
            cache: "no-store",
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch your properties");
    }

    return response.json();
});

export default GetMyProperties;