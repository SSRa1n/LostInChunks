import { useEffect, useState } from 'react';
import styles from './section_indicator.module.css';

type SectionIndicatorProps = {
    length: number;
    activeIndex: number;
}

export default function SectionIndicator({ length, activeIndex }: SectionIndicatorProps) {
    return (
        <div className={styles.indicatorContainer}>
            {Array.from({ length }).map((_, index) => (
                <div
                    key={index}
                    className={`${styles.indicator} ${index === activeIndex ? styles.active : ''}`} />
            ))}
        </div>
    );
}
