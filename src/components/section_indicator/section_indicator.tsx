import styles from './section_indicator.module.css';

type SectionIndicatorProps = {
    topics: string[];
    activeIndex: number;
    onChange: (index: number) => void;
}

export default function SectionIndicator({ topics, activeIndex, onChange }: SectionIndicatorProps) {
    console.log("topics", topics);
    return (
        <div className={styles.indicatorContainer}>
            {Array.from({ length: topics.length }).map((_, index) => (
                <div className={styles.indicatorWrapper}>
                    <p
                        className={`${index === activeIndex ? styles.active : ''}`}
                    >
                        {topics[index]}</p>
                    <button
                        key={index}
                        type="button"
                        aria-label={`Go to section ${index + 1}`}
                        aria-current={index === activeIndex ? 'true' : undefined}
                        onClick={() => onChange(index)}
                        className={`${styles.indicator} ${index === activeIndex ? styles.active : ''}`} />
                </div>
            ))}
        </div>
    );
}
