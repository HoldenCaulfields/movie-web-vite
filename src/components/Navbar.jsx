import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';


const Navbar = () => {
    return (
        <nav className="bg-black text-white flex gap-4 justify-between items-center sticky top-0 z-50">
            <Link to="/" className="p-4 flex items-center">
                <Logo />
            </Link>
            <div className="flex-1 flex justify-center">
                <Link to="/search" className="hover:text-gray-400 hover:bg-gray-700 p-4">Search</Link>
            </div>
            <div className="flex gap-4">
                <Link to="/" className="hover:text-gray-400 hover:bg-gray-700 p-4">Home</Link>
                <Link to="/about" className="hover:text-gray-400 hover:bg-gray-700 p-4">About</Link>
                <Link to="/login" className="hover:text-gray-400 hover:bg-gray-700 p-4">Login</Link>
            </div>
        </nav>
    );
};

export default Navbar;