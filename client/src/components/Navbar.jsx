/**
 * Navbar Component
 * Production-ready navigation with responsive design
 */

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoImage from '../assets/image/Gaurangas-Group-Logo.png';
import '../styles/navbar.css';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const location = useLocation();

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

    const isActive = (path) => {
        return location.pathname === path;
    };

    // Get user from localStorage - initialized to null to avoid hydration mismatch
    const [user, setUser] = useState(null);
    const [isClient, setIsClient] = useState(false);

    // Set isClient to true after mount to avoid hydration mismatch
    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (isClient) {
            const userData = localStorage.getItem('user');
            if (userData) {
                setUser(JSON.parse(userData));
            }
        }
    }, [location, isClient]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        window.location.href = '/';
    };

    // Base navigation items - immutable
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

    // Get dashboard item based on role - only on client side
    const getDashboardItem = () => {
        if (!isClient || !user) return null;

        if (user.role === 'admin') {
            return { path: '/admin-dashboard', label: 'Admin Dashboard' };
        } else if (user.role === 'counselor') {
            return { path: '/counselor-dashboard', label: 'Counselor Dashboard' };
        }
        return null;
    };

    const dashboardItem = getDashboardItem();

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
                    {baseNavigationItems.slice(0, -1).map((item, index) => renderNavItem(item, index))}

                    {/* Dashboard item - conditionally rendered */}
                    {dashboardItem && (
                        <li
                            style={{ '--i': baseNavigationItems.length - 1 }}
                            className="navbar-menu-item"
                        >
                            <Link
                                to={dashboardItem.path}
                                className={`navbar-menu-link ${isActive(dashboardItem.path) ? 'active' : ''}`}
                            >
                                {dashboardItem.label}
                            </Link>
                        </li>
                    )}

                    {/* Last item (Blog) */}
                    {renderNavItem(baseNavigationItems[baseNavigationItems.length - 1], baseNavigationItems.length - 1)}
                </ul>

                {/* Login Button or User Info */}
                <div className="navbar-cta">
                    {user ? (
                        <div className="navbar-user-info">
                            <span className="navbar-user-name">{user.name}</span>
                            <button onClick={handleLogout} className="navbar-logout-button">
                                Logout
                            </button>
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
