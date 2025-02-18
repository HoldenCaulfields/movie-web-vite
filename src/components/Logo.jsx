import React from 'react';
import movieLogo from '../assets/movie.svg'; // Update path to the new logo

const Logo = () => {
    return (
        <div className="flex items-center space-x-2">
            <img src={movieLogo} alt="Movie Logo" className="h-8 w-8 hover:scale-110 transition-all duration-300" />
            <p className="text-2xl font-bold hover:text-gray-300">OldFilms</p>
        </div>
    );
};

export default Logo;
