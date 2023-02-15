import { SPOTIFY_BASE_URL } from "$env/static/private";
import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async({ cookies, url, fetch }) => {
    const accessToken = cookies.get('access_token');
    const refreshToken = cookies.get('refresh_token');
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
    } if (profileRes.status === 401 && refreshToken) {
        const refrfeshRes = await fetch('/api/auth/refresh')
        if (refrfeshRes.ok) {
            throw redirect(307, url.pathname)
        }
    } else {
        return {
            user: null
        }
    }
}