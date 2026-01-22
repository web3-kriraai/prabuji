import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/Dashboard.css';

const CounselorDashboard = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Get user from localStorage
        const userData = localStorage.getItem('user');
        if (!userData) {
            navigate('/login');
            return;
        }

        const parsedUser = JSON.parse(userData);

        // Check if user is counselor
        if (parsedUser.role !== 'counselor') {
            navigate('/');
            return;
        }

        setUser(parsedUser);
    }, [navigate]);

    if (!user) {
        return <div className="dashboard-loading">Loading...</div>;
    }

    const statsCards = [
        { title: 'Assigned Users', value: '28', icon: '👥', color: '#4F46E5' },
        { title: 'Active Sessions', value: '12', icon: '🎯', color: '#7C3AED' },
        { title: 'Completed', value: '156', icon: '✅', color: '#10B981' },
        { title: 'Pending Reports', value: '5', icon: '📝', color: '#F59E0B' },
    ];

    const assignedUsers = [
        { name: 'Rajesh Kumar', status: 'Active', lastSession: '2 days ago' },
        { name: 'Priya Sharma', status: 'Active', lastSession: '1 day ago' },
        { name: 'Amit Patel', status: 'Pending', lastSession: '5 days ago' },
        { name: 'Sneha Reddy', status: 'Active', lastSession: 'Today' },
    ];

    return (
        <div className="dashboard-container">
            <motion.div
                className="dashboard-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Header */}
                <div className="dashboard-header">
                    <div>
                        <h1 className="dashboard-title">Counselor Dashboard</h1>
                        <p className="dashboard-subtitle">Welcome back, {user.name}!</p>
                    </div>
                    <div className="dashboard-badge counselor-badge">
                        <span className="badge-icon">🎯</span>
                        <span>Counselor</span>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="stats-grid">
                    {statsCards.map((stat, index) => (
                        <motion.div
                            key={index}
                            className="stat-card"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        >
                            <div className="stat-icon" style={{ backgroundColor: `${stat.color}20` }}>
                                <span style={{ color: stat.color }}>{stat.icon}</span>
                            </div>
                            <div className="stat-info">
                                <p className="stat-title">{stat.title}</p>
                                <h3 className="stat-value">{stat.value}</h3>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Quick Actions */}
                <motion.div
                    className="quick-actions"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <h2 className="section-title">Quick Actions</h2>
                    <div className="actions-grid">
                        <button className="action-button">
                            <span className="action-icon">📝</span>
                            <span>New Report</span>
                        </button>
                        <button className="action-button">
                            <span className="action-icon">📅</span>
                            <span>Schedule Session</span>
                        </button>
                        <button className="action-button">
                            <span className="action-icon">👥</span>
                            <span>View Users</span>
                        </button>
                        <button className="action-button">
                            <span className="action-icon">📊</span>
                            <span>My Reports</span>
                        </button>
                    </div>
                </motion.div>

                {/* Assigned Users */}
                <motion.div
                    className="assigned-users"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    <h2 className="section-title">Assigned Users</h2>
                    <div className="users-list">
                        {assignedUsers.map((assignedUser, index) => (
                            <div key={index} className="user-item">
                                <div className="user-avatar">
                                    {assignedUser.name.charAt(0)}
                                </div>
                                <div className="user-details">
                                    <p className="user-name">{assignedUser.name}</p>
                                    <span className="user-session">Last session: {assignedUser.lastSession}</span>
                                </div>
                                <span className={`user-status ${assignedUser.status.toLowerCase()}`}>
                                    {assignedUser.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default CounselorDashboard;
