import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './ComingSoon2k26.css';

const ComingSoon2k26 = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    const contentRef = useRef(null);

    // Target date configured to match the visual
    const targetDate = new Date('2026-03-20T00:00:00');

    useEffect(() => {
        // Elegant and vibrant GSAP entrance animation
        if (contentRef.current) {
            const bannerElements = document.querySelectorAll('.animate-banner');
            const eventDetails = document.querySelector('.event-details');
            const countdownBoxes = document.querySelectorAll('.countdown-box');

            const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

            tl.fromTo(bannerElements,
                { y: -30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.15 }
            )
                .fromTo(countdownBoxes,
                    { scale: 0.8, opacity: 0, y: 20 },
                    { scale: 1, opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
                    "-=0.4"
                )
                .fromTo(eventDetails,
                    { y: 40, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8 },
                    "-=0.2"
                );
        }
    }, []);

    useEffect(() => {
        // Countdown Timer Logic
        const calculateTimeLeft = () => {
            const difference = +targetDate - +new Date();
            let timeLeftVar = { days: 0, hours: 0, minutes: 0, seconds: 0 };

            if (difference > 0) {
                timeLeftVar = {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                };
            }
            return timeLeftVar;
        };

        setTimeLeft(calculateTimeLeft());

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="coming-soon-2k26-container">
            <div className="top-banner" ref={contentRef}>
                <h1 className="page-title animate-banner">Coming Soon</h1>
                <h2 className="banner-title animate-banner">BEings, are you ready?</h2>
                <h3 className="banner-subtitle animate-banner">the countdown to our very own Pujo has already begun!</h3>
            </div>

            <div className="coming-soon-2k26-content">
                <div className="coming-soon-2k26-countdown">
                    <div className="countdown-box">
                        <span className="countdown-value">{String(timeLeft.days).padStart(2, '0')}</span>
                        <span className="countdown-label">DAYS</span>
                    </div>
                    <div className="countdown-box">
                        <span className="countdown-value">{String(timeLeft.hours).padStart(2, '0')}</span>
                        <span className="countdown-label">HOURS</span>
                    </div>
                    <div className="countdown-box">
                        <span className="countdown-value">{String(timeLeft.minutes).padStart(2, '0')}</span>
                        <span className="countdown-label">MINUTES</span>
                    </div>
                    <div className="countdown-box">
                        <span className="countdown-value">{String(timeLeft.seconds).padStart(2, '0')}</span>
                        <span className="countdown-label">SECONDS</span>
                    </div>
                </div>

                <div className="event-details">
                    <h3 className="event-date">MARCH 20-23</h3>
                    <p className="event-location">
                        Lords' Ground, IIEST Shibpur
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ComingSoon2k26;
