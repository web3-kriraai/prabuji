import { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../lib/utils'; // Assuming cn utility exists, otherwise I'll need to define it or use standard template literals. I'll check forutils.

export function TypingAnimation({
    children,
    className,
    duration = 50,
    delay = 0,
    startOnView = true
}) {
    const [displayedText, setDisplayedText] = useState('');
    const [started, setStarted] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        if (!startOnView) {
            setStarted(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setStarted(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => observer.disconnect();
    }, [startOnView]);

    useEffect(() => {
        if (!started) return;

        let i = 0;
        const text = (typeof children === 'string' ? children : String(children)).trim();
        setDisplayedText(''); // Ensure clean start

        const interval = setInterval(() => {
            if (i < text.length) {
                setDisplayedText(text.substring(0, i + 1));
                i++;
            } else {
                clearInterval(interval);
            }
        }, duration);

        return () => clearInterval(interval);
    }, [started, children, duration, delay]);

    return (
        <span ref={elementRef} className={className}>
            {displayedText}
        </span>
    );
}

TypingAnimation.propTypes = {
    children: PropTypes.string.isRequired,
    className: PropTypes.string,
    duration: PropTypes.number,
    delay: PropTypes.number,
    startOnView: PropTypes.bool
};
