import React, { useEffect, useState } from "react";

const Feature = () => {
    const [movies, setMovies] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/movie/popular?api_key=c43ad444bda65f9a710343cf24045ce0')
            .then(response => response.json())
            .then(data => {
                const moviesData = data.results.map(movie => ({
                    title: movie.title,
                    description: movie.overview,
                    imageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                    release_date: movie.release_date,
                    vote_average: movie.vote_average,
                    backdrop_path: movie.backdrop_path
                }));
                setMovies(moviesData);
            })
            .catch(error => console.error('Error fetching movies:', error));
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
        }, 5000); // Auto-scroll every 5 seconds

        return () => clearInterval(interval);
    }, [movies]);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + movies.length) % movies.length);
    };

    return (
        <div className="feature flex h-[80vh] mt-10 bg-gray-900 w-[95vw] mx-auto shadow-lg text-white">
            <div className="left flex-2 relative flex items-center justify-center">
                {movies.length > 0 && (
                    <div className="movie-item flex-shrink-0 h-full w-full relative">
                        <img src={`https://image.tmdb.org/t/p/w1280${movies[currentIndex].backdrop_path}`} alt={movies[currentIndex].title} className="absolute inset-0 w-full h-full z-0 transition-transform duration-1000 ease-in-out transform translate-x-0" />
                        <img src={movies[currentIndex].imageUrl} alt={movies[currentIndex].title} className="absolute bottom-4 left-4 w-64 h-96 object-cover transition-opacity duration-500 ease-in-out opacity-0 z-10 rounded-lg" onLoad={(e) => e.target.classList.remove('opacity-0')} />
                    </div>
                )}
                <button onClick={handlePrevious} className="absolute left-4 px-4 py-4 text-white rounded cursor-pointer transition-transform duration-1000 ease-in-out transform z-20 hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-100 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button onClick={handleNext} className="absolute right-4 px-4 py-4 text-white rounded cursor-pointer transition-transform duration-1000 ease-in-out transform z-20 hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-100 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
            
            <div className="right flex-1 overflow-y-auto p-4 text-left cursor-pointer">
                <h2 className="text-2xl font-bold">Most popular movies list week:</h2>
                {movies.map((movie, index) => (
                    <div key={index} className={`movie mt-4 mb-4 flex ${index % 2 === 0 ? 'bg-gray-700' : 'bg-gray-600'} hover:bg-gray-500 transition-transform duration-500 ease-in-out transform hover:scale-105 p-4 rounded-lg`}>
                        <img src={movie.imageUrl} alt={movie.title} className="w-24 h-36 mr-4 transition-transform duration-500 ease-in-out transform hover:translate-x-2 rounded-lg" />
                        <div>
                            <h3 className="text-xl font-bold mt-2">{movie.title}</h3>
                            <p className="text-yellow-400 mt-1 font-bold text-md">Rating: {movie.vote_average}</p>
                            <p className="mt-1">{movie.release_date}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Feature;
