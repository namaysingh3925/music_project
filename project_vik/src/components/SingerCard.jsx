import React from 'react';

const SingerCard = ({ name, image }) => {
    return (
        <div className="artist-card">
            <div className="circle-avatar">
                {image && <img src={image} alt={name} />}
            </div>
            <div className="artist-info">
                <p className="artist-name">{name}</p>
                <button className="play-btn">Play</button>
            </div>
        </div>
    );
};

export default SingerCard;