/**
 * Navbar Component
 * Production-ready navigation with responsive design and authentication
 */

import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LogoutButton from './LogoutButton';
import logoImage from '../assets/image/Gaurangas-Group-Logo.png';
import '../styles/navbar.css';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout, loading } = useAuth();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
        setIsDropdownOpen(false);
        setShowUserMenu(false);
    }, [location]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMobileMenuOpen]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const toggleUserMenu = () => {
        setShowUserMenu(!showUserMenu);
    };

    const isActive = (path) => {
        return location.pathname === path;
    };

    const handleDashboardClick = () => {
        if (user?.role === 'admin') {
            navigate('/admin/dashboard');
        } else if (user?.role === 'counselor') {
            navigate('/counselor/dashboard');
        } else {
            navigate('/dashboard');
        }
    };

    // Base navigation items
    const baseNavigationItems = [
        { path: '/', label: 'Home' },
        { path: '/about', label: 'About Us' },
        {
            label: 'Gauranga Vidhyapitha',
            dropdown: [
                { path: '/gauranga-vidhyapitha', label: 'Gauranga Vidhyapitha' },
                { path: '/accountability', label: 'Accountability' },
                { path: '/chalo-tirthyatra', label: 'Chalo Tirthyatra' },
            ],
        },
        { path: '/contact', label: 'Contact Us' },
        { path: '/blog', label: 'Blog' },
    ];

    // Get role badge color
    const getRoleBadgeColor = () => {
        if (!user) return '';
        switch (user.role) {
            case 'admin':
                return 'bg-lavender text-white';
            case 'counselor':
                return 'bg-soft-green text-gray-800';
            case 'user':
                return 'bg-sky-blue text-gray-800';
            default:
                return 'bg-gray-200 text-gray-800';
        }
    };

    // Render a single navigation item
    const renderNavItem = (item, index) => {
        const style = { '--i': index };

        if (item.dropdown) {
            return (
                <li
                    key={index}
                    style={style}
                    className={`navbar-menu-item navbar-dropdown ${isDropdownOpen ? 'active' : ''}`}
                    onMouseEnter={() => !isMobileMenuOpen && setIsDropdownOpen(true)}
                    onMouseLeave={() => !isMobileMenuOpen && setIsDropdownOpen(false)}
                >
                    <button
                        type="button"
                        className="navbar-menu-link"
                        onClick={toggleDropdown}
                        aria-expanded={isDropdownOpen}
                        aria-haspopup="true"
                    >
                        {item.label}
                        <svg
                            className="navbar-dropdown-icon"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </button>
                    <ul className="navbar-dropdown-menu">
                        <div className="navbar-dropdown-inner">
                            {item.dropdown.map((subItem, subIndex) => (
                                <li key={subIndex} className="navbar-dropdown-item">
                                    <Link
                                        to={subItem.path}
                                        className="navbar-dropdown-link"
                                    >
                                        {subItem.label}
                                    </Link>
                                </li>
                            ))}
                        </div>
                    </ul>
                </li>
            );
        }

        return (
            <li key={index} style={style} className="navbar-menu-item">
                <Link
                    to={item.path}
                    className={`navbar-menu-link ${isActive(item.path) ? 'active' : ''}`}
                >
                    {item.label}
                </Link>
            </li>
        );
    };

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                {/* Logo */}
                <Link to="/" className="navbar-logo" aria-label="Gaurangas Group Home">
                    <img
                        src={logoImage}
                        alt="Gaurangas Group Logo"
                        className="navbar-logo-image"
                    />
                </Link>

                {/* Navigation Menu */}
                <ul className={`navbar-menu ${isMobileMenuOpen ? 'active' : ''}`}>
                    {baseNavigationItems.map((item, index) => renderNavItem(item, index))}
                </ul>

                {/* Login Button or User Profile */}
                <div className="navbar-cta">
                    {loading ? (
                        // Show nothing or a small loader while checking auth
                        <div className="w-24 h-10"></div>
                    ) : user ? (
                        <div className="relative">
                            <button
                                onClick={toggleUserMenu}
                                className="flex items-center gap-3 px-4 py-2 rounded-full bg-white border border-gray-200 hover:shadow-md transition-all duration-300"
                            >
                                <div className={`w-9 h-9 rounded-full ${getRoleBadgeColor()} flex items-center justify-center font-semibold text-sm`}>
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="hidden md:block text-left">
                                    <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                                    <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                                </div>
                                <svg
                                    className={`w-4 h-4 text-gray-600 transition-transform ${showUserMenu ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {/* User Dropdown Menu */}
                            {showUserMenu && (
                                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
                                    <div className="px-4 py-3 border-b border-gray-100">
                                        <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                                        <p className="text-xs text-gray-500">{user.email}</p>
                                        <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${getRoleBadgeColor()}`}>
                                            {user.role}
                                        </span>
                                    </div>
                                    <button
                                        onClick={handleDashboardClick}
                                        className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors text-sm text-gray-700 font-medium"
                                    >
                                        📊 My Dashboard
                                    </button>
                                    <LogoutButton className="w-full text-left px-4 py-2 hover:bg-red-50 transition-colors text-sm text-red-600 font-medium rounded-lg" />
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/login" className="navbar-cta-button">
                            Login
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className={`navbar-mobile-toggle ${isMobileMenuOpen ? 'active' : ''}`}
                    onClick={toggleMobileMenu}
                    aria-label="Toggle navigation menu"
                    aria-expanded={isMobileMenuOpen}
                >
                    <span className="navbar-mobile-toggle-bar"></span>
                    <span className="navbar-mobile-toggle-bar"></span>
                    <span className="navbar-mobile-toggle-bar"></span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
