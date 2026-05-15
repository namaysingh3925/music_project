// src/context/PlayerContext.jsx
import { createContext, useContext, useState } from "react";

const PlayerContext = createContext(null);

export function PlayerProvider({ children }) {
    const [tracks, setTracks] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const playTracks = (newTracks, index = 0) => {
        setTracks(newTracks);
        setCurrentIndex(index);
    };

    return (
        <PlayerContext.Provider value={{ tracks, currentIndex, playTracks }}>
            {children}
        </PlayerContext.Provider>
    );
}

export function usePlayer() {
    return useContext(PlayerContext);
}