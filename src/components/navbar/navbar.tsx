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
                <p>Right</p>
                <a href="#/presetmap">Preset Map</a>
            </div>
        </nav>
    );
}