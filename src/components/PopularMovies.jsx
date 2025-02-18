import React, { useEffect, useState } from "react";

const PopularMovies = () => {
    const [movies, setMovies] = useState([]);
    const [angle, setAngle] = useState(0);

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/movie/popular?api_key=c43ad444bda65f9a710343cf24045ce0')
            .then(response => response.json())
            .then(data => {
                const moviesData = data.results.map(movie => ({
                    title: movie.title,
                    description: movie.overview,
                    imageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                    release_date: movie.release_date,
                    vote_average: movie.vote_average
                }));
                setMovies(moviesData);
            })
            .catch(error => console.error('Error fetching movies:', error));
    }, []);

    const spinLeft = () => {
        setAngle(prevAngle => prevAngle - 15 * (Math.PI / 180));
    };

    const spinRight = () => {
        setAngle(prevAngle => prevAngle + 15 * (Math.PI / 180));
    };

    return (
        <div className="relative mx-auto h-screen bg-gray-600 flex flex-col items-center justify-center cursor-pointer">
            <h1 className="text-2xl font-bold text-white absolute top-5">Most Popular Movies</h1>

            <div className="relative w-full h-full flex items-center justify-center">
                {movies.map((movie, index) => {
                    const totalMovies = movies.length;
                    const movieAngle = ((2 * Math.PI * index) / totalMovies) + angle;

                    return (
                        <div key={index} className="absolute group transition-all duration-500"
                            style={{ 
                                top: `calc(50% + ${150 * Math.sin(movieAngle)}px)`, 
                                left: `calc(50% + ${500 * Math.cos(movieAngle)}px)`, 
                                transform: 'translate(-50%, -50%)'
                            }}>
                            
                            {/* Movie Poster */}
                            <div className="relative w-32 h-auto rounded-lg overflow-hidden shadow-lg transition-transform duration-300 group-hover:scale-110">
                                <img src={movie.imageUrl} alt={movie.title} className="w-full h-auto" />
                                
                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-black bg-opacity-80 text-white flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2">
                                    <h2 className="text-lg font-bold text-center">{movie.title}</h2>
                                    <p className="text-yellow-400 text-sm">⭐ {movie.vote_average}</p>
                                    <p className="text-gray-300 text-xs">📅 {movie.release_date}</p>
                                </div>
                            </div>

                        </div>
                    );
                })}
            </div>

            {/* Navigation Buttons */}
            <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-10">
                <button onClick={spinLeft} className="p-3 bg-black opacity-50 rounded hover:opacity-70 transition cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button onClick={spinRight} className="p-3 bg-black opacity-50 rounded hover:opacity-70 transition cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default PopularMovies;
