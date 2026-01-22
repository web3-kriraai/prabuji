import React from 'react';

const Blog = () => {
    return (
        <div className="container" style={{ padding: '4rem 2rem' }}>
            <h1 style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontFamily: 'var(--font-accent)',
                color: 'var(--color-secondary)',
                marginBottom: '2rem'
            }}>
                Blog
            </h1>
            <p style={{
                fontSize: '1.125rem',
                color: 'var(--color-text-light)',
                lineHeight: 1.8
            }}>
                Read our latest spiritual insights and teachings.
            </p>
        </div>
    );
};

export default Blog;
