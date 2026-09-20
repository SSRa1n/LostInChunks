import { useState } from 'react';
import ComparisonView from '../../components/comparison_view/comparison_view';
import MazePlayground from '../../components/maze_playground/maze_playground';
import { generateMaze, type MazeOptions, type MazeData } from '../../lib/generate_maze';
import styles from './comparison_page.module.css';

export default function ComparisonPage() {
    const [width, setWidth] = useState<number>(15);
    const [height, setHeight] = useState<number>(11);
    const [options, setOptions] = useState<MazeOptions>({});
    const [mazeData, setMazeData] = useState<MazeData>(() => generateMaze(width, height));

    const handleGenerate = (newWidth: number, newHeight: number, newOptions: MazeOptions) => {
        setWidth(newWidth);
        setHeight(newHeight);
        setOptions(newOptions);
        const newMaze = generateMaze(newWidth, newHeight, newOptions);
        setMazeData(newMaze);
    };

    const handleRegenerate = () => {
        const newMaze = generateMaze(width, height, options);
        setMazeData(newMaze);
    };

    return (
        <div className={styles.container}>
            <section className={styles.section}>
                <MazePlayground 
                    width={width}
                    height={height}
                    mazeData={mazeData}
                    options={options}
                    onGenerate={handleGenerate}
                />
                <div className={styles.scrollIndicator}>
                    <span>Scroll for Comparison</span>
                    <span>↓</span>
                </div>
            </section>
            
            <section className={styles.section}>
                <ComparisonView 
                    mazeData={mazeData}
                    onRegenerate={handleRegenerate}
                />
            </section>
        </div>
    );
}