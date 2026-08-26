import { NavLink } from 'react-router-dom';
import styles from './navbar.module.css';
import { useEffect, useRef, useState } from "react";

const COMPASS_FRAMES = 29;
const COMPASS_REVOLUTION_TIME = 900;
const COMPASS_FRAME_TIME = COMPASS_REVOLUTION_TIME / COMPASS_FRAMES;
const COMPASS_IDLE_SWING_RANGE = 15;

const wrapFrame = (frame: number) =>
    ((frame % COMPASS_FRAMES) + COMPASS_FRAMES) % COMPASS_FRAMES;

export default function Navbar() {
    const [currentFrame, setCurrentFrame] = useState(0);

    const frameIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const idleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const stopAnimation = () => {
        if (frameIntervalRef.current !== null) {
            clearInterval(frameIntervalRef.current);
            frameIntervalRef.current = null;
        }

        if (idleTimeoutRef.current !== null) {
            clearTimeout(idleTimeoutRef.current);
            idleTimeoutRef.current = null;
        }
    };

    const startSpin = () => {
        stopAnimation();

        frameIntervalRef.current = setInterval(() => {
            setCurrentFrame((frame) => wrapFrame(frame + 1));
        }, COMPASS_FRAME_TIME);
    };

    const startIdleAnimation = () => {
        stopAnimation();

        const randomStride = Math.floor(Math.random() * (COMPASS_IDLE_SWING_RANGE * 2 + 1)) - COMPASS_IDLE_SWING_RANGE;

        let remainingFrames = randomStride;

        frameIntervalRef.current = setInterval(() => {
            if (remainingFrames === 0) {
                stopAnimation();

                // Wait one second before doing another idle movement
                idleTimeoutRef.current = setTimeout(
                    startIdleAnimation,
                    1000
                );

                return;
            }

            setCurrentFrame((frame) =>
                wrapFrame(frame + Math.sign(remainingFrames))
            );

            remainingFrames -= Math.sign(remainingFrames);
        }, 100);
    };

    useEffect(() => {
        startIdleAnimation();

        return () => {
            stopAnimation();
        };
    }, []);

    return (
        <nav className={styles.navbar}>
            <div className={styles['navbar-left']}>
                <span
                    className="navbar-icon-container"
                    onMouseEnter={startSpin}
                    onMouseLeave={startIdleAnimation}>
                    <a href="#/" className="chunk-icon" />
                    <a
                        href="#/"
                        className="compass-icon"
                        style={{
                            backgroundPosition: `calc(var(--navbar-compass-icon-size) * -${currentFrame}) 0`,
                        }}
                    />
                    <a href="#/" className="navbar-title"><h3>LostInChunks</h3></a>
                </span>

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