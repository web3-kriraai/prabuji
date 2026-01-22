import React from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaInstagram, FaYoutube, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
    return (
        <div className="contact-page" style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #F0F4F8 0%, #FFFFFF 100%)',
            fontFamily: 'var(--font-primary, sans-serif)',
            color: '#022B3A',
            paddingBottom: '4rem'
        }}>
            {/* Header */}
            <div style={{
                textAlign: 'center',
                padding: '4rem 2rem 3rem',
            }}>
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{
                        fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                        fontWeight: 800,
                        color: '#022B3A',
                        marginBottom: '1rem',
                        fontFamily: 'var(--font-accent, serif)'
                    }}
                >
                    Contact Us
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    style={{
                        maxWidth: '600px',
                        margin: '0 auto',
                        fontSize: '1.1rem',
                        color: '#1F7A8C',
                        lineHeight: 1.6
                    }}
                >
                    Have questions? We'd love to hear from you. Reach out to us for any inquiries about our courses, yatras, or seva opportunities.
                </motion.p>
            </div>

            <div className="container" style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '0 2rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                gap: '3rem',
                alignItems: 'start'
            }}>
                {/* Contact Form Section */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{
                        background: '#ffffff',
                        borderRadius: '30px',
                        padding: '3rem',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                        border: '1px solid #E1E5F2',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    {/* Decorative Background Blob */}
                    <div style={{
                        position: 'absolute',
                        top: '-50px',
                        right: '-50px',
                        width: '150px',
                        height: '150px',
                        background: 'radial-gradient(circle, #BFDBF7 0%, transparent 70%)',
                        opacity: 0.5,
                        zIndex: 0
                    }} />

                    <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative', zIndex: 1 }}>
                        <div>
                            <label style={labelStyle}>Name</label>
                            <input
                                type="text"
                                placeholder="Enter your full name"
                                style={inputStyle}
                            />
                        </div>
                        <div>
                            <label style={labelStyle}>Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                style={inputStyle}
                            />
                        </div>
                        <div>
                            <label style={labelStyle}>Message</label>
                            <textarea
                                placeholder="How can we help you?"
                                rows="5"
                                style={{ ...inputStyle, resize: 'vertical' }}
                            />
                        </div>

                        <button
                            style={{
                                marginTop: '1rem',
                                padding: '1.2rem 2.5rem',
                                fontSize: '1.1rem',
                                fontWeight: 700,
                                color: '#FFFFFF',
                                background: 'linear-gradient(135deg, #1F7A8C 0%, #022B3A 100%)', // Teal to Jet Black gradient
                                border: 'none',
                                borderRadius: '12px',
                                cursor: 'pointer',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                width: '100%',
                                boxShadow: '0 10px 20px rgba(31, 122, 140, 0.2)',
                                textTransform: 'uppercase',
                                letterSpacing: '1px'
                            }}
                            onMouseOver={(e) => {
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 15px 30px rgba(31, 122, 140, 0.3)';
                            }}
                            onMouseOut={(e) => {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 10px 20px rgba(31, 122, 140, 0.2)';
                            }}
                        >
                            Send Message
                        </button>
                    </form>

                    {/* Contact Info List with Icons */}
                    <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '2px dashed #E1E5F2' }}>
                        <h3 style={{ fontSize: '1.5rem', color: '#022B3A', marginBottom: '1.5rem', fontWeight: 700 }}>Or reach us directly</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                            <ContactRow
                                icon={<FaEnvelope />}
                                title="Email Us"
                                value="gaurangasgroup@gmail.com"
                                href="mailto:gaurangasgroup@gmail.com"
                                color="#1F7A8C"
                                label="email"
                            />
                            <ContactRow
                                icon={<FaPhoneAlt />}
                                title="Call Us"
                                value="+91 7990200618"
                                href="tel:+917990200618"
                                color="#1F7A8C"
                                label="phone"
                            />
                            <ContactRow
                                icon={<FaMapMarkerAlt />}
                                title="Visit Us"
                                value="Vrindavan, Uttar Pradesh, India"
                                color="#1F7A8C"
                                label="location"
                            />
                        </div>
                    </div>

                    <div style={{ marginTop: '2rem' }}>
                        <motion.a
                            href="https://api.whatsapp.com/send/?phone=917990200618&text&type=phone_number&app_absent=0"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.8rem',
                                background: '#E6FFFA',
                                color: '#25D366',
                                border: '2px solid #25D366',
                                padding: '1rem',
                                borderRadius: '12px',
                                textDecoration: 'none',
                                fontWeight: 700,
                                fontSize: '1rem',
                                transition: 'all 0.2s',
                            }}
                        >
                            <FaWhatsapp size={24} />
                            Chat with us on WhatsApp
                        </motion.a>
                    </div>

                </motion.div>

                {/* Map Section */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    style={{
                        height: '100%',
                        minHeight: '600px',
                        background: '#FFFFFF',
                        borderRadius: '30px',
                        overflow: 'hidden',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                        padding: '1rem',
                        border: '1px solid #E1E5F2'
                    }}
                >
                    <div style={{ borderRadius: '25px', overflow: 'hidden', height: '100%', position: 'relative' }}>
                        <iframe
                            width="100%"
                            height="100%"
                            style={{ border: 0, minHeight: '600px', filter: 'grayscale(0.2) contrast(1.1)' }} // Slight styling to map
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Gaurangas Group Location"
                            src="https://maps.google.com/maps?q=Gaurangas%20Group,%20B9,%20Second%20Floor,%20Bhaktivedanta%20Complex,%20Sri%20Premanand%20Rd,%20near%20ISKCON%20Police%20Choki,%20near%20Agrasen%20Ashram,%20Raman%20Reiti,%20Vrindavan,%20Uttar%20Pradesh%20281121&t=&z=16&ie=UTF8&iwloc=&output=embed"
                        ></iframe>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: 700,
    color: '#022B3A',
    fontSize: '0.95rem',
    marginLeft: '0.2rem'
};

const inputStyle = {
    width: '100%',
    padding: '1.2rem',
    borderRadius: '12px',
    border: '2px solid #E1E5F2',
    fontSize: '1rem',
    outline: 'none',
    color: '#022B3A',
    background: '#F8FAFC',
    transition: 'all 0.3s ease',
};

const ContactRow = ({ icon, title, value, href, color }) => {
    const content = (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.8rem', borderRadius: '12px', transition: 'background 0.2s' }} className="contact-row">
            <div style={{
                width: '45px',
                height: '45px',
                background: `${color}15`, // 15% opacity
                color: color,
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                flexShrink: 0
            }}>
                {icon}
            </div>
            <div>
                <h4 style={{ margin: 0, fontSize: '0.85rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.2rem' }}>{title}</h4>
                <p style={{ margin: 0, fontSize: '1.05rem', color: '#022B3A', fontWeight: 600 }}>{value}</p>
            </div>
        </div>
    );

    if (href) {
        return (
            <a href={href} style={{ textDecoration: 'none', color: 'inherit' }}>
                {content}
            </a>
        );
    }
    return content;
};

export default Contact;
