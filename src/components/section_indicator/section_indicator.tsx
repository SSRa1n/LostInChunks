import styles from './section_indicator.module.css';

type SectionIndicatorProps = {
    length: number;
    activeIndex: number;
    onChange: (index: number) => void;
}

export default function SectionIndicator({ length, activeIndex, onChange }: SectionIndicatorProps) {
    return (
        <div className={styles.indicatorContainer}>
            {Array.from({ length }).map((_, index) => (
                <button
                    key={index}
                    type="button"
                    aria-label={`Go to section ${index + 1}`}
                    aria-current={index === activeIndex ? 'true' : undefined}
                    onClick={() => onChange(index)}
                    className={`${styles.indicator} ${index === activeIndex ? styles.active : ''}`} />
            ))}
        </div>
    );
}
