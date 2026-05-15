import React from 'react';

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <input type="text" placeholder="search" className="search-bar" />
            <ul className="menu">
                <li>Explore</li>
                <li>Favourites</li>
                <li>Liked songs</li>
                <li>My playlist</li>
            </ul>
        </aside>
    );
};

export default Sidebar;