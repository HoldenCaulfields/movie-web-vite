import React, { useEffect, useState } from "react";

const TrendingArtists = () => {
    const [artists, setArtists] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0); // Move one by one

    useEffect(() => {
        // Replace with your API key from TMDb
        const apiKey = 'c43ad444bda65f9a710343cf24045ce0';

        fetch(`https://api.themoviedb.org/3/trending/person/week?api_key=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                const artistsData = data.results.map(artist => ({
                    name: artist.name,
                    imageUrl: artist.profile_path
                        ? `https://image.tmdb.org/t/p/w500${artist.profile_path}`
                        : "https://via.placeholder.com/150", // Default image if missing
                    popularity: artist.popularity
                }));
                setArtists(artistsData);
            })
            .catch(error => console.error('Error fetching artists:', error));
    }, []);

    const artistsPerPage = 5;
    const displayedArtists = artists.slice(currentIndex, currentIndex + artistsPerPage);

    // Move to the next artist (one-by-one)
    const nextArtist = () => {
        if (currentIndex < artists.length - artistsPerPage) {
            setCurrentIndex(prev => prev + 1);
        }
    };

    // Move to the previous artist (one-by-one)
    const prevArtist = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    return (
        <div className="container mx-auto my-10 px-6 py-8 relative rounded-xl shadow-lg" 
             style={{ background: "linear-gradient(135deg, #1a1a2e, #16213e)" }}>
            
            {/* Section Title */}
            <h2 className="text-4xl font-bold text-center text-white mb-6">🔥 Trending Artists 🔥</h2>

            {/* Artists Grid with Smooth Transition */}
            <div className="overflow-hidden relative px-4">
                <div 
                    className="grid grid-cols-5 gap-6 transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}px)` }} 
                >
                    {displayedArtists.map((artist, index) => (
                        <div key={index} className="text-center bg-gray-900 p-4 rounded-lg shadow-md transform hover:scale-105 transition-all">
                            {/* Artist Image */}
                            <img 
                                src={artist.imageUrl} 
                                alt={artist.name} 
                                className="w-40 h-40 md:w-48 md:h-48 rounded-full mx-auto shadow-lg border-4 border-gray-700" 
                            />
                            {/* Artist Name */}
                            <p className="mt-3 text-white font-semibold text-lg">{artist.name}</p>
                            {/* Popularity Score */}
                            <p className="text-yellow-400 text-sm mt-1">⭐ Popularity: {artist.popularity.toFixed(1)}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="absolute inset-y-1/2 left-0 right-0 flex justify-between transform -translate-y-1/2 px-6 cursor-pointer">
                <button 
                    onClick={prevArtist} 
                    disabled={currentIndex === 0} 
                    className="p-4 bg-opacity-60 text-white rounded-full  disabled:opacity-30 transition-all cursor-pointer"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button 
                    onClick={nextArtist} 
                    disabled={currentIndex >= artists.length - artistsPerPage} 
                    className="p-4  bg-opacity-60 text-white rounded-full disabled:opacity-30 transition-all cursor-pointer"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default TrendingArtists;
