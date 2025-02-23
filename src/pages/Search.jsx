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

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
            <h1 className="text-4xl font-bold mb-6 text-center">Movie Search</h1>
            <form onSubmit={handleSearch} className="w-full max-w-lg flex flex-col sm:flex-row gap-4">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for a movie..."
                    className="flex-grow p-3 rounded-lg text-black outline-none border-2 border-gray-400 focus:border-blue-500 transition-all"
                />
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-all"
                >
                    Search
                </button>
            </form>

            {loading && (
                <div className="mt-6 flex justify-center">
                    <div className="animate-spin border-4 border-t-transparent border-blue-500 rounded-full w-12 h-12"></div>
                </div>
            )}

            {error && (
                <div className="mt-6 bg-red-500 text-white p-4 rounded-lg text-center">
                    {error}
                </div>
            )}

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
                {results.length > 0 ? (
                    results.map((movie, index) => (
                        <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition-all">
                            <img 
                                src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : 'https://via.placeholder.com/200'}
                                alt={movie.title} 
                                className="w-full h-auto rounded-md mb-4" 
                            />
                            <h2 className="text-lg font-semibold text-white">{movie.title}</h2>
                            <p className="text-gray-400 text-sm">{movie.overview.slice(0, 100)}...</p>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-400 col-span-full">No results found</p>
                )}
            </div>
        </div>
    );
};

export default Search;
