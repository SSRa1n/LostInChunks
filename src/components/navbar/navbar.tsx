import { NavLink } from 'react-router-dom';
import styles from './navbar.module.css';

export default function Navbar() {
    return (
        <nav className={styles['navbar']}>
            <div className={styles['navbar-left']}>
                <a href="#/">
                    <img src="./web-icon.webp" alt="Logo" className={styles['navbar-logo']} />
                </a>
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