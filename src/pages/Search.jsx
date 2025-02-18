import React, { useState } from 'react';
import axios from 'axios';

const Search = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        if (query.trim() === '') return;

        setLoading(true);
        setError('');
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
                params: {
                    api_key: 'c43ad444bda65f9a710343cf24045ce0',
                    query: query
                }
            });
            setResults(response.data.results);
        } catch (error) {
            setError('Error fetching data from TMDb API');
            console.error('Error fetching data from TMDb API', error);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch(e);
        }
    };

    return (
        <div className="container mx-auto p-4 min-h-screen bg-gradient-to-r from-gey-600 via-hrey-800 to-grey-900">
            <h1 className="text-3xl font-bold text-center mb-6 text-white">Search Movies</h1>
            <form onSubmit={handleSearch} className="mb-6 flex flex-col items-center">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Search for a movie..."
                    className="border-2 border-gray-300 rounded-lg p-3 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 mb-4"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-all duration-300"
                >
                    Search
                </button>
            </form>

            {loading && (
                <div className="flex justify-center">
                    <div className="animate-spin border-4 border-t-transparent border-blue-500 rounded-full w-12 h-12"></div>
                </div>
            )}

            {error && (
                <div className="bg-red-500 text-white p-4 rounded-lg text-center mb-4">
                    {error}
                </div>
            )}

            <div>
                {results.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {results.map((movie, index) => (
                            <div key={index} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                                <img 
                                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} 
                                    alt={movie.title} 
                                    className="w-full h-auto rounded-md mb-4" 
                                />
                                <h2 className="text-lg font-semibold text-gray-800">{movie.title}</h2>
                                <p className="text-gray-600 text-sm">{movie.overview.slice(0, 100)}...</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No results found</p>
                )}
            </div>
        </div>
    );
};

export default Search;
