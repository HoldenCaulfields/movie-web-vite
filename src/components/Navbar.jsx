import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi'; // Import menu icons
import Logo from './Logo';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-black text-white sticky top-0 z-50 p-4">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center">
                    <Logo />
                </Link>
                
                {/* Desktop Menu */}
                <div className="hidden md:flex gap-6">
                    <Link to="/search" className="hover:text-gray-400 transition">Search</Link>
                    <Link to="/" className="hover:text-gray-400 transition">Home</Link>
                    <Link to="/about" className="hover:text-gray-400 transition">About</Link>
                    <Link to="/login" className="hover:text-gray-400 transition">Login</Link>
                </div>
                
                {/* Mobile Menu Button */}
                <button 
                    className="md:hidden text-2xl focus:outline-none" 
                    onClick={() => setIsOpen(!isOpen)} 
                    aria-label="Toggle menu"
                >
                    {isOpen ? <FiX /> : <FiMenu />}
                </button>
            </div>
            
            {/* Mobile Menu */}
            <div className={`md:hidden flex flex-col items-center gap-4 bg-black transition-all ${isOpen ? 'h-auto py-4' : 'h-0 overflow-hidden'}`}>
                <Link to="/search" className="hover:text-gray-400" onClick={() => setIsOpen(false)}>Search</Link>
                <Link to="/" className="hover:text-gray-400" onClick={() => setIsOpen(false)}>Home</Link>
                <Link to="/about" className="hover:text-gray-400" onClick={() => setIsOpen(false)}>About</Link>
                <Link to="/login" className="hover:text-gray-400" onClick={() => setIsOpen(false)}>Login</Link>
            </div>
        </nav>
    );
};

export default Navbar;
