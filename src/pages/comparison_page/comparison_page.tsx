import { useState } from 'react';
import ComparisonView from '../../components/comparison_view/comparison_view';
import MazePlayground from '../../components/maze_playground/maze_playground';
import { generateMaze, type MazeOptions, type MazeData } from '../../lib/generate_maze';

import SectionIndicator from '../../components/section_indicator/section_indicator';
import { useSectionNavigation } from '../../lib/use_section_navigation';
import { getSectionState } from '../../lib/section_navigation';

import styles from './comparison_page.module.css';

const sections = [
    {
        id: 1,
        title: "Maze Playground",
    },
    {
        id: 2,
        title: "Algorithm Comparison",
    },
];

export default function ComparisonPage() {
    const [width, setWidth] = useState<number>(15);
    const [height, setHeight] = useState<number>(11);
    const [options, setOptions] = useState<MazeOptions>({});
    const [mazeData, setMazeData] = useState<MazeData>(() => generateMaze(width, height));

    const {activeIndex, direction, goToIndex} = useSectionNavigation(sections.length);

    const handleGenerate = (newWidth: number, newHeight: number, newOptions: MazeOptions) => {
        setWidth(newWidth);
        setHeight(newHeight);
        setOptions(newOptions);
        setMazeData(generateMaze(newWidth, newHeight, newOptions));
    };

    const handleRegenerate = () => {
        setMazeData(generateMaze(width, height, options));
    };

    return (
        <div className={styles.container}>
            <div className={styles.sections}>
                {sections.map((section, index) => {
                    const state = getSectionState(index, activeIndex, direction);

                    return (
                        <section
                            key={section.id}
                            className={`${styles.section} ${styles[state]}`}
                        >
                            {index === 0 && (
                                <>
                                    <MazePlayground
                                        width={width}
                                        height={height}
                                        mazeData={mazeData}
                                        options={options}
                                        onGenerate={handleGenerate}
                                    />

                                    <div
                                        className={styles.scrollIndicator}
                                    >
                                        <span>
                                            Scroll for Comparison
                                        </span>
                                        <span>↓</span>
                                    </div>
                                </>
                            )}

                            {index === 1 && (
                                <ComparisonView
                                    mazeData={mazeData}
                                    onRegenerate={handleRegenerate}
                                />
                            )}
                        </section>
                    );
                })}
            </div>

            <SectionIndicator
                topics={sections.map((section) => section.title)}
                activeIndex={activeIndex}
                onChange={(index) => goToIndex(index, index > activeIndex ? "down" : "up")}
            />
        </div>
    );
}