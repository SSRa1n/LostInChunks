import { useEffect, useState } from 'react';
import styles from './section_indicator.module.css';

interface SectionIndicatorProps { containerRef: React.RefObject<HTMLElement | null>; } 

export default function SectionIndicator({ containerRef, }: SectionIndicatorProps) {
    const [sections, setSections] = useState<HTMLElement[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);
    
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const updateSections = () => {
            const foundSections = Array.from( container.querySelectorAll<HTMLElement>(':scope > section') );
            setSections(foundSections); 
        };
        
        updateSections();
        
        const mutationObserver = new MutationObserver(updateSections);
        mutationObserver.observe(container, { childList: true, });
        return () => { 
            mutationObserver.disconnect();
        }; 
    }, [containerRef]);

    useEffect(() => { 
        const container = containerRef.current;
        if (!container || sections.length === 0) return;
        const observer = new IntersectionObserver( (entries) => { 
            entries.forEach((entry) => { 
                if (entry.isIntersecting) { 
                    const index = sections.indexOf(entry.target as HTMLElement);
                    if (index !== -1) { setActiveIndex(index); } 
                } 
            }); 
        }, { root: container, threshold: 0.6, } );
        
        sections.forEach((section) => observer.observe(section));
        
        return () => { observer.disconnect(); }; 
    }, [containerRef, sections]);
    
    const scrollToSection = (index: number) => { 
        const section = sections[index];
        if (!section) return;
        section.scrollIntoView({ behavior: 'smooth', block: 'start', }); 
    };
    
    if (sections.length <= 1) { return null; } 
    
    return ( 
        <div className={styles.indicator} aria-label="Section navigation">
            {sections.map((_, index) => (
                <button 
                    key={index} 
                    type="button" 
                    className={`${styles.dot} ${ index === activeIndex ? styles.active : '' }`} 
                    onClick={() => scrollToSection(index)} 
                    aria-label={`Go to section ${index + 1}`} 
                    aria-current={index === activeIndex ? 'true' : undefined} 
                /> 
            ))} 
        </div> 
    ); 
}
