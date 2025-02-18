
import React from "react";
import Feature from "../components/Feature";
import PopularMovies from "../components/PopularMovies";
import TrendingArtists from "../components/Artist";

const Home = () => {
    return (
        <div className="min-h-screen">
            <Feature />
            <TrendingArtists />
            <PopularMovies />
        </div>
    );
};

export default Home;