import React from "react";
import SingerCard from "../components/SingerCard";
import { useLibrary } from "../context/LibraryContext";
import { usePlayer } from "../context/PlayerContext";
import {
    hasSpotifyToken, getArtistByQuery, getArtistTopTracks, trackFromSpotify,
} from "../spotify";

export default function Favourites() {
    const { favorites } = useLibrary();
    const { playTracks } = usePlayer();

    const playArtist = async (artistName) => {
        if (!hasSpotifyToken()) {
            alert("Connect Spotify (Log In page) to play previews.");
            return;
        }
        try {
            const a = await getArtistByQuery(artistName);
            const top = await getArtistTopTracks(a.id);
            const playable = top.tracks.map(trackFromSpotify).filter((t) => t.previewUrl);
            if (!playable.length) return alert("No previews available.");
            playTracks(playable, 0);
        } catch (e) { alert(e.message); }
    };

    return (
        <div>
            <h1 className="page-title">Your Favourites</h1>
            {favorites.length === 0 ? (
                <div className="empty-state">
                    <p>You haven&apos;t favourited any artists yet.</p>
                    <p>Click the heart on any artist to save them here.</p>
                </div>
            ) : (
                <div className="grid-container">
                    {favorites.map((a) => (
                        <SingerCard
                            key={a.name}
                            name={a.name}
                            image={a.image}
                            onPlay={playArtist}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
