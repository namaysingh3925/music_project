// Spotify Web API helpers — PKCE auth + simple wrappers.
const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const redirectUri = import.meta.env.VITE_REDIRECT_URI;

const scopes = [
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state",
    "streaming",
];

export async function redirectToAuthCodeFlow() {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);
    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", redirectUri);
    params.append("scope", scopes.join(" "));
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

export async function getAccessToken(code) {
    const verifier = localStorage.getItem("verifier");
    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", redirectUri);
    params.append("code_verifier", verifier);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params,
    });
    const { access_token } = await result.json();
    return access_token;
}

// -------- Wrappers that use the Spotify token from localStorage --------

function spotifyHeaders() {
    const token = localStorage.getItem("spotifyToken");
    if (!token) throw new Error("Not connected to Spotify");
    return { Authorization: `Bearer ${token}` };
}

export function hasSpotifyToken() {
    return !!localStorage.getItem("spotifyToken");
}

export async function searchSpotify(q, types = "artist,track") {
    const r = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(q)}&type=${types}&limit=12`,
        { headers: spotifyHeaders() },
    );
    if (!r.ok) throw new Error("Spotify search failed");
    return r.json();
}

export async function getArtistByQuery(q) {
    const data = await searchSpotify(q, "artist");
    return data.artists?.items?.[0] || null;
}

export async function getArtistTopTracks(artistId, market = "US") {
    const r = await fetch(
        `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=${market}`,
        { headers: spotifyHeaders() },
    );
    if (!r.ok) throw new Error("Failed to load top tracks");
    return r.json();
}

export function trackFromSpotify(t) {
    return {
        trackId: t.id,
        name: t.name,
        artist: t.artists?.map((a) => a.name).join(", "),
        album: t.album?.name,
        image: t.album?.images?.[0]?.url,
        previewUrl: t.preview_url,
        durationMs: t.duration_ms,
    };
}

// -------- PKCE helpers --------

function generateCodeVerifier(length) {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest("SHA-256", data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
}
