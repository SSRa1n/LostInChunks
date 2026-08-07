import styles from './footer.module.css';

export default function PageFooter() {
    return (
        <footer className={styles['page-footer']}>
            <p>© 2026 Lost in Chunks. All rights reserved.</p>
            <div className={styles['footer-links']}>
                <a href="#" onClick={(e) => e.preventDefault()}>About</a>
                <a href="#" onClick={(e) => e.preventDefault()}>Youtube</a>
                <a href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
            </div>
        </footer>
    );
}