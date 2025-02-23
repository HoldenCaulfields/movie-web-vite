import React, { useEffect, useState } from "react";

const Feature = () => {
    const [movies, setMovies] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=c43ad444bda65f9a710343cf24045ce0');
                const data = await response.json();
                const moviesData = data.results.map(movie => ({
                    title: movie.title,
                    description: movie.overview,
                    imageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                    release_date: movie.release_date,
                    vote_average: movie.vote_average,
                    backdrop_path: `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
                }));
                setMovies(moviesData);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();
    }, []);

    useEffect(() => {
        if (movies.length === 0) return;
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [movies]);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + movies.length) % movies.length);
    };

    return (
        <div className="feature flex flex-col md:flex-row h-auto md:h-[80vh] mt-10 bg-gray-900 w-full max-w-[95vw] mx-auto shadow-lg text-white">
            <div className="left relative flex items-center justify-center w-full md:w-2/3 h-[50vh] md:h-full">
                {movies.length > 0 && (
                    <div className="movie-item w-full h-full relative">
                        <img
                            src={movies[currentIndex].backdrop_path}
                            alt={movies[currentIndex].title}
                            className="absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1000 ease-in-out opacity-0"
                            onLoad={(e) => e.target.classList.remove('opacity-0')}
                        />
                        <img
                            src={movies[currentIndex].imageUrl}
                            alt={movies[currentIndex].title}
                            className="absolute bottom-4 left-4 w-32 sm:w-48 md:w-64 h-44 sm:h-64 md:h-96 object-cover transition-opacity duration-500 ease-in-out opacity-0 z-10 rounded-lg"
                            loading="lazy"
                            onLoad={(e) => e.target.classList.remove('opacity-0')}
                        />
                    </div>
                )}
                <button onClick={handlePrevious} className="absolute left-4 px-4 py-4 text-white rounded cursor-pointer transition-transform duration-1000 ease-in-out transform z-20 hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button onClick={handleNext} className="absolute right-4 px-4 py-4 text-white rounded cursor-pointer transition-transform duration-1000 ease-in-out transform z-20 hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
            
            <div className="right flex-1 overflow-y-auto p-4 text-left w-full md:w-1/3 h-[50vh] md:h-full">
                <h2 className="text-xl md:text-2xl font-bold mb-4">Most Popular Movies This Week:</h2>
                {movies.map((movie, index) => (
                    <div key={index} className={`movie mt-4 mb-4 flex items-center space-x-4 p-3 sm:p-4 rounded-lg transition-transform duration-500 ease-in-out transform hover:scale-105 ${index % 2 === 0 ? 'bg-gray-700' : 'bg-gray-600'} hover:bg-gray-500`}>
                        <img src={movie.imageUrl} alt={movie.title} className="w-16 h-24 sm:w-20 sm:h-28 md:w-24 md:h-36 rounded-lg object-cover transition-transform duration-500 ease-in-out hover:translate-x-2" loading="lazy" />
                        <div>
                            <h3 className="text-md sm:text-lg md:text-xl font-bold">{movie.title}</h3>
                            <p className="text-yellow-400 font-bold text-xs sm:text-sm md:text-md">⭐ {movie.vote_average}</p>
                            <p className="text-gray-300 text-xs sm:text-sm">{movie.release_date}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Feature;
