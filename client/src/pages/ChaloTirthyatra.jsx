import React from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaTrain, FaMapMarkerAlt, FaCalendarAlt, FaUserFriends, FaMountain, FaPrayingHands } from 'react-icons/fa';
import tem2 from '../assets/image/temp2.jpg';

const ChaloTirthyatra = () => {
    return (
        <div className="chalo-tirthyatra-page" style={{
            minHeight: '100vh',
            background: '#FFFFFF',
            fontFamily: 'var(--font-primary, sans-serif)',
            color: '#022B3A'
        }}>
            {/* Header / Hero Section - Simplified */}
            <div style={{
                position: 'relative',
                padding: '4rem 2rem 2rem',
                textAlign: 'center'
            }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 style={{
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                        fontWeight: 700,
                        color: '#022B3A',
                        marginBottom: '1rem'
                    }}>
                        Chalo Tirthyatra
                    </h1>
                    <p style={{
                        fontSize: '1.2rem',
                        maxWidth: '800px',
                        margin: '0 auto 3rem',
                        color: '#022B3A',
                        opacity: 0.8,
                        lineHeight: 1.6
                    }}>
                        Embark on sacred journeys to rediscover your soul in the holy lands of Bharat.
                    </p>
                </motion.div>

                {/* Main Image - Contained and Simple */}
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    style={{
                        maxWidth: '1000px',
                        margin: '0 auto 4rem',
                        borderRadius: '20px',
                        overflow: 'hidden',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                    }}
                >
                    <img
                        src={tem2}
                        alt="Chalo Tirthyatra"
                        style={{
                            width: '100%',
                            height: 'auto',
                            maxHeight: '400px',
                            objectFit: 'cover',
                            display: 'block'
                        }}
                    />
                </motion.div>
            </div>

            {/* Content Section */}
            <div className="container" style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '0 2rem 5rem'
            }}>
                <div style={{
                    display: 'grid',
                    gap: '4rem'
                }}>
                    {/* 84 Kos Vrindavan Yatra Card */}
                    <YatraCard
                        title="84 Kos Vrindavan Yatra"
                        icon="🛕"
                        delay={0.2}
                    >
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                            gap: '4rem',
                            alignItems: 'center'
                        }}>
                            <div style={{ flex: 1.2 }}>
                                <InfoGrid>
                                    <InfoItem icon={<FaCalendarAlt />} label="Date" value="24th – 31st Oct 2025" />
                                    <InfoItem icon={<FaTrain />} label="Travel" value="AC Train, Bus & Rooms" />
                                    <InfoItem icon={<FaMapMarkerAlt />} label="Location" value="Barsana, Nandgaon, Govardhan, Gokul" />
                                    <InfoItem icon={<FaUserFriends />} label="Eligibility" value="Open for all seekers" />
                                </InfoGrid>
                            </div>
                            <div style={{
                                background: '#FFFFFF',
                                borderRadius: '24px',
                                padding: '3rem 2rem',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textAlign: 'center',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.03)',
                                minWidth: '280px'
                            }}>
                                <h3 style={{
                                    fontSize: '1.5rem',
                                    marginBottom: '0.8rem',
                                    color: '#022B3A',
                                    fontWeight: 800
                                }}>Join the Divine Journey</h3>
                                <p style={{
                                    color: '#022B3A',
                                    opacity: 0.7,
                                    marginBottom: '2rem',
                                    fontSize: '1rem',
                                    maxWidth: '250px'
                                }}>Experience the divine love of Vrindavan.</p>
                                <WhatsAppButton />
                            </div>
                        </div>
                    </YatraCard>

                    {/* Upcoming Himalayan Yatra Card */}
                    <YatraCard
                        title="Upcoming Himalayan Yatra"
                        icon={<FaMountain />}
                        delay={0.4}
                    >
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                            gap: '4rem',
                            alignItems: 'center'
                        }}>
                            <div style={{ flex: 1.2 }}>
                                <InfoGrid>
                                    <InfoItem icon={<FaCalendarAlt />} label="Expected Date" value="Coming Soon (2026)" />
                                    <InfoItem icon={<FaMapMarkerAlt />} label="Locations" value="Rishikesh, Haridwar, Kedarnath Trail" />
                                </InfoGrid>
                            </div>
                            <div style={{
                                borderLeft: '2px solid rgba(2, 43, 58, 0.08)',
                                paddingLeft: '3rem',
                                display: 'flex',
                                alignItems: 'center',
                                minHeight: '120px'
                            }}>
                                <p style={{
                                    fontSize: '1.2rem',
                                    fontStyle: 'italic',
                                    opacity: 0.75,
                                    lineHeight: 1.6,
                                    color: '#022B3A',
                                    maxWidth: '400px'
                                }}>
                                    "The Himalayas are not just mountains, they are the abode of the divine. Prepare for an ascent to spiritual heights."
                                </p>
                            </div>
                        </div>
                    </YatraCard>
                </div>
            </div>
        </div>
    );
};

const YatraCard = ({ children, title, icon, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay }}
        style={{
            background: '#E1E5F2',
            borderRadius: '25px',
            padding: '3rem',
            boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
            color: '#022B3A',
            position: 'relative',
            overflow: 'hidden'
        }}
    >
        <h2 style={{
            fontSize: '1.8rem',
            marginBottom: '2.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            fontWeight: 800,
            color: '#022B3A'
        }}>
            <span style={{
                background: '#FFFFFF',
                width: '45px',
                height: '45px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                fontSize: '1.2rem',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
            }}>
                {icon}
            </span>
            {title}
        </h2>
        {children}
    </motion.div>
);

const InfoGrid = ({ children }) => (
    <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '2rem 1.5rem',
        marginBottom: '0'
    }}>
        {children}
    </div>
);

const InfoItem = ({ icon, label, value }) => (
    <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
        <div style={{
            color: '#022B3A',
            fontSize: '1.2rem',
            marginTop: '0.1rem',
            opacity: 0.8
        }}>
            {icon}
        </div>
        <div>
            <h4 style={{
                margin: 0,
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                color: '#022B3A',
                opacity: 0.6,
                fontWeight: 700,
                marginBottom: '0.2rem'
            }}>{label}</h4>
            <p style={{
                margin: 0,
                fontSize: '0.95rem',
                fontWeight: 600,
                color: '#022B3A',
                lineHeight: 1.4
            }}>{value}</p>
        </div>
    </div>
);

const WhatsAppButton = () => (
    <motion.a
        href="https://api.whatsapp.com/send/?phone=917990200618&text&type=phone_number&app_absent=0"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            background: '#25D366',
            color: '#FFFFFF',
            padding: '0.8rem 2rem',
            borderRadius: '50px',
            fontSize: '1rem',
            fontWeight: 700,
            textDecoration: 'none',
            boxShadow: '0 5px 15px rgba(37, 211, 102, 0.2)',
            transition: 'all 0.3s ease'
        }}
    >
        <FaWhatsapp size={20} />
        Join Now
    </motion.a>
);

export default ChaloTirthyatra;
