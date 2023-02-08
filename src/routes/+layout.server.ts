import { SPOTIFY_BASE_URL } from "$env/static/private";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async({ cookies }) => {
    const accessToken = cookies.get('access_token');
    if (!accessToken) {
        return {
            user: null
        }
    }

    const profileRes = await fetch(`${SPOTIFY_BASE_URL}/me`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    if (profileRes.ok) {
        const profile: SpotifyApi.CurrentUsersProfileResponse = await profileRes.json()
        return {
            user: profile
        }
    } else {
        return {
            user: null
        }
    }
}