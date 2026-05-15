import React, { useEffect, useState } from "react";
import SingerCard from "../components/SingerCard";
import { trendingArtists } from "../data/artists";
import {
    hasSpotifyToken, getArtistByQuery, getArtistTopTracks, trackFromSpotify,
} from "../spotify";
import { usePlayer } from "../context/PlayerContext";

export default function Home() {
    const { playTracks } = usePlayer();
    const [spotifyTop, setSpotifyTop] = useState([]);

    useEffect(() => {
        if (!hasSpotifyToken()) return;
        fetch("https://api.spotify.com/v1/me/top/artists?limit=8", {
            headers: { Authorization: `Bearer ${localStorage.getItem("spotifyToken")}` },
        })
            .then((r) => r.ok ? r.json() : null)
            .then((d) => {
                if (d?.items) {
                    setSpotifyTop(d.items.map((a) => ({ name: a.name, image: a.images[0]?.url })));
                }
            })
            .catch(() => {});
    }, []);

    const playArtist = async (artistName) => {
        if (!hasSpotifyToken()) {
            alert("Please connect Spotify (Log In page) to play previews.");
            return;
        }
        try {
            const artist = await getArtistByQuery(artistName);
            if (!artist) return alert("Artist not found.");
            const top = await getArtistTopTracks(artist.id);
            const playable = top.tracks.map(trackFromSpotify).filter((t) => t.previewUrl);
            if (!playable.length) return alert("No previews available for this artist.");
            playTracks(playable, 0);
        } catch (e) {
            alert(e.message);
        }
    };

    return (
        <div>
            {spotifyTop.length > 0 && (
                <section style={{ marginBottom: 40 }}>
                    <h1 className="page-title">Your Top Artists</h1>
                    <div className="grid-container">
                        {spotifyTop.map((a, i) => (
                            <SingerCard
                                key={`top-${i}`}
                                name={a.name}
                                image={a.image}
                                onPlay={playArtist}
                            />
                        ))}
                    </div>
                </section>
            )}

            <section>
                <h1 className="page-title">Trending</h1>
                <div className="grid-container">
                    {trendingArtists.map((a) => (
                        <SingerCard
                            key={a.name}
                            name={a.name}
                            image={a.image}
                            onPlay={playArtist}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}
