import { cache } from "react";
import RefreshTokenAction from "@/data/tokens/refreshtoken";

const GetWhoAmI = cache(async function GetWhoAmI() {
    try {
        const accessToken = await RefreshTokenAction();

        const response = await fetch(
            "http://backend:8000/users/whoami/",
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                cache: "no-store",
            }
        );

        if (!response.ok) {
            return null;
        }

        return await response.json();
    } catch {
        return null;
    }
});

export default GetWhoAmI;