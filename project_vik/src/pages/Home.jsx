import React from 'react';
import SingerCard from '../components/singerCard';

const Home = () => {
    const artists = [
        { name: "Drake", image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPRe05b-7ElyXcgDeI3kOzX0S7z-ySzDDEjQ&s' },
        { name: "playboi carti", image: "https://m.media-amazon.com/images/I/A194kjllWaL.jpg" },
        { name: "Kanye West", image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Kanye_West_at_the_2009_Tribeca_Film_Festival_%28crop_2%29.jpg/250px-Kanye_West_at_the_2009_Tribeca_Film_Festival_%28crop_2%29.jpg' },
        { name: "Taylor Swift", image: "https://i8.amplience.net/i/naras/Taylor-Swift-2023-GRAMMYs-GettyImages-1463250180" },
        { name: "Future", image: "https://media.gq.com/photos/55828b4f1177d66d68d528a7/1:1/w_450,h_450,c_limit/blogs-the-feed-2014-04-28-rapper-future-honest-album-release-music-hip-hop.jpg" },
        { name: "The Weeknd", image: "https://cdn-images.dzcdn.net/images/cover/eea9f7fc913300e40307a0ff70dc73cf/1900x1900-000000-80-0-0.jpg" },
        { name: "The 1975", image: "https://m.media-amazon.com/images/I/51gM+cEkGDL._UF1000,1000_QL80_.jpg" },
        { name: "Travis Scott", image: "https://pbs.twimg.com/profile_images/634514155261833216/czgYrPLQ.jpg" },
        { name: "maroon5", image: "https://upload.wikimedia.org/wikipedia/en/5/53/Maroon_5_-_V_%28Official_Album_Cover%29.png" },
        { name: "Justin Bieber", image: "https://assets.vogue.com/photos/6053ac29a7265f514347db52/master/w_2560%2Cc_limit/Justin-Bieber-vogue-credit-Mike-Rosenthal-1.jpg" },
        { name: "Ariana Grande", image: "https://i.abcnewsfe.com/a/a149a3c4-edfc-4d66-aca6-8eb8bef478a7/ariana-grande-file-gty-jef-230626_1687799866608_hpMain_1x1.jpg?w=992" },
        { name: "chain smokers", image: "https://i.scdn.co/image/ab6761610000e5eb4567279fac84a0375c3d819b" },
        { name: "ed sheeran ", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ7sMsQiej2zOZWKE1_4qCZ495grhmr9H0qg&s" },
        { name: "dua lipa", image: "https://i8.amplience.net/i/naras/Dua-Lipa-2024-GRAMMYs-GettyImages-1986165304" },
        { name: "coldplay", image: "https://gcp-na-images.contentstack.com/v3/assets/bltea6093859af6183b/bltdd8725f0f9bcc9f9/69868f561eebf74272370e1d/coldplay-ghost-stories.jpg?branch=production&width=3840&quality=75&auto=webp&crop=3:2" },
        { name: "tate macrae", image: "https://i8.amplience.net/i/naras/Tate_McRae_Press_Photo_Credit_Alvaro_Beamud_Cortes" },
    ];

    return (
        <div className="grid-container">
            {artists.map((artist, index) => (
                <SingerCard key={index} name={artist.name} image={artist.image} />
            ))}
        </div>
    );
}

export default Home;