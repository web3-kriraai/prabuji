import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/Dashboard.css';

const AdminDashboard = () => {
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'user'
    });
    const [formError, setFormError] = useState('');
    const [formSuccess, setFormSuccess] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Get user from localStorage
        const userData = localStorage.getItem('user');
        if (!userData) {
            navigate('/login');
            return;
        }

        const parsedUser = JSON.parse(userData);

        // Check if user is admin
        if (parsedUser.role !== 'admin') {
            navigate('/');
            return;
        }

        setUser(parsedUser);
        fetchUsers();
    }, [navigate]);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/users');

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Ensure data is an array
            if (Array.isArray(data)) {
                setUsers(data);
            } else {
                console.error('Expected array but got:', data);
                setUsers([]);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching users:', error);
            setUsers([]); // Set to empty array on error
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleCreateUser = async (e) => {
        e.preventDefault();
        setFormError('');
        setFormSuccess('');

        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.msg || 'Failed to create user');
            }

            setFormSuccess('User created successfully!');
            setFormData({ name: '', email: '', password: '', role: 'user' });
            fetchUsers(); // Refresh user list

            // Hide success message after 3 seconds
            setTimeout(() => {
                setFormSuccess('');
                setShowCreateForm(false);
            }, 2000);
        } catch (error) {
            setFormError(error.message);
        }
    };

    const handleDeleteUser = async (userId) => {
        if (!window.confirm('Are you sure you want to delete this user?')) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Failed to delete user');
            }

            fetchUsers(); // Refresh user list
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('Failed to delete user');
        }
    };

    if (!user) {
        return <div className="dashboard-loading">Loading...</div>;
    }

    const statsCards = [
        { title: 'Total Users', value: users.length, icon: '👥', color: '#4F46E5' },
        { title: 'Admins', value: users.filter(u => u.role === 'admin').length, icon: '👑', color: '#7C3AED' },
        { title: 'Counselors', value: users.filter(u => u.role === 'counselor').length, icon: '🎯', color: '#EC4899' },
        { title: 'Regular Users', value: users.filter(u => u.role === 'user').length, icon: '👤', color: '#10B981' },
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
                        <h1 className="dashboard-title">Admin Dashboard</h1>
                        <p className="dashboard-subtitle">Welcome back, {user.name}!</p>
                    </div>
                    <div className="dashboard-badge admin-badge">
                        <span className="badge-icon">👑</span>
                        <span>Administrator</span>
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

                {/* User Management Section */}
                <motion.div
                    className="user-management"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <div className="section-header">
                        <h2 className="section-title">User Management</h2>
                        <button
                            className="create-user-btn"
                            onClick={() => setShowCreateForm(!showCreateForm)}
                        >
                            {showCreateForm ? '✕ Cancel' : '➕ Create User'}
                        </button>
                    </div>

                    {/* Create User Form */}
                    <AnimatePresence>
                        {showCreateForm && (
                            <motion.div
                                className="create-user-form-container"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <form className="create-user-form" onSubmit={handleCreateUser}>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="Enter full name"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="Enter email address"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Password</label>
                                            <input
                                                type="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="Enter password"
                                                minLength="6"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Role</label>
                                            <select
                                                name="role"
                                                value={formData.role}
                                                onChange={handleInputChange}
                                            >
                                                <option value="user">User</option>
                                                <option value="counselor">Counselor</option>
                                                <option value="admin">Admin</option>
                                            </select>
                                        </div>
                                    </div>
                                    {formError && <div className="form-error">{formError}</div>}
                                    {formSuccess && <div className="form-success">{formSuccess}</div>}
                                    <button type="submit" className="submit-btn">Create User</button>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Users List */}
                    <div className="users-table-container">
                        {loading ? (
                            <div className="loading-text">Loading users...</div>
                        ) : (
                            <table className="users-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Created</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((u) => (
                                        <tr key={u._id}>
                                            <td>{u.name}</td>
                                            <td>{u.email}</td>
                                            <td>
                                                <span className={`role-badge ${u.role}`}>
                                                    {u.role}
                                                </span>
                                            </td>
                                            <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                                            <td>
                                                <button
                                                    className="delete-btn"
                                                    onClick={() => handleDeleteUser(u._id)}
                                                    disabled={u._id === user.id}
                                                >
                                                    🗑️ Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default AdminDashboard;
