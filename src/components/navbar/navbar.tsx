import { NavLink } from 'react-router-dom';
import styles from './navbar.module.css';
import { useEffect, useRef } from "react";

export default function Navbar() {
    const compassRef = useRef<HTMLAnchorElement>(null);
    const animationRef = useRef<Animation | null>(null);
    const hoveringRef = useRef(false);

    useEffect(() => {
        const el = compassRef.current;
        if (!el) return;

        const animation = el.animate(
            [
                { backgroundPosition: "0 0" },
                {
                    backgroundPosition:
                        "calc(var(--navbar-compass-icon-size) * -28) 0",
                },
            ],
            {
                duration: 800,
                easing: "steps(28, end)",
                fill: "both",
            }
        );

        animation.pause();
        animation.currentTime = 0;

        animation.onfinish = () => {
            if (!hoveringRef.current) {
                return;
            }

            animation.currentTime = 0;
            animation.playbackRate = 1;
            animation.play();
        };

        animationRef.current = animation;

        return () => {
            animation.cancel();
            animationRef.current = null;
        };
    }, []);

    const handleMouseEnter = () => {
        const animation = animationRef.current;
        if (!animation) return;

        hoveringRef.current = true;

        animation.playbackRate = 1;
        animation.play();
    };

    const handleMouseLeave = () => {
        const animation = animationRef.current;
        if (!animation) return;

        hoveringRef.current = false;

        animation.playbackRate = -1;
        animation.play();
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles['navbar-left']}>
                <span
                    className="navbar-icon-container"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <a href="#/" className="chunk-icon" />

                    <a
                        href="#/"
                        className="compass-icon"
                        ref={compassRef}
                    />
                </span>

                <p>LostInChunks</p>
            </div>

            <div className={styles['navbar-right']}>
                <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                        isActive ? styles.active : ''
                    }
                >
                    Problem
                </NavLink>

                <NavLink
                    to="/comparison"
                    className={({ isActive }) =>
                        isActive ? styles.active : ''
                    }
                >
                    Comparison
                </NavLink>

                <NavLink
                    to="/presetmap"
                    className={({ isActive }) =>
                        isActive ? styles.active : ''
                    }
                >
                    Preset Map
                </NavLink>
            </div>
        </nav>
    );
} 