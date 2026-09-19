import { useEffect, useState } from "react";
import type { MazeOptions, MazeData } from '../../lib/generate_maze'

import styles from "./maze_playground.module.css";
import RenderMaze from "../render_maze/render_maze";

type MazePlaygroundProps = {
    width: number;
    height: number;
    mazeData: MazeData;
    options?: MazeOptions;
    onGenerate: (width: number, height: number, options: MazeOptions) => void;
};

type FormState = {
    width: number;
    height: number;
    seed: string;
    alternativePathChance: number;
    maxInfinitePathObstacles: number;
    obstacleDensityMultiplier: number;
    startX: number;
    startY: number;
    goalX: number;
    goalY: number;
};

export default function MazePlayground({
    width,
    height,
    mazeData,
    options = {},
    onGenerate,
}: MazePlaygroundProps) {
    const [form, setForm] = useState<FormState>(() => ({
        width,
        height,
        seed: options.seed?.toString() ?? "",
        alternativePathChance: options.alternativePathChance ?? 0.1,
        maxInfinitePathObstacles: options.maxInfinitePathObstacles ?? 2,
        obstacleDensityMultiplier: options.obstacleDensityMultiplier ?? 1,
        startX: options.startPosition?.x ?? 1,
        startY: options.startPosition?.y ?? height - 2,
        goalX: options.goalPosition?.x ?? width - 2,
        goalY: options.goalPosition?.y ?? 1,
    }));

    useEffect(() => {
        setForm(prev => {
            const newWidth = Math.max(3, Math.floor(width));
            const newHeight = Math.max(3, Math.floor(height));
            const maxX = Math.max(1, newWidth - 2);
            const maxY = Math.max(1, newHeight - 2);

            return {
                ...prev,
                width,
                height,
                startX: Math.min(prev.startX, maxX),
                startY: Math.min(prev.startY, maxY),
                goalX: Math.min(prev.goalX, maxX),
                goalY: Math.min(prev.goalY, maxY),
            };
        });
    }, [width, height]);

    const updateNumber = (
        field: keyof FormState,
        value: string
    ) => {
        const parsed = Number(value);
        const validNum = Number.isFinite(parsed) ? parsed : 0;

        setForm(prev => {
            const updated = { ...prev, [field]: validNum };

            if (field === "width") {
                const newWidth = Math.max(3, Math.floor(validNum));
                const maxX = Math.max(1, newWidth - 2);
                updated.startX = Math.min(updated.startX, maxX);
                updated.goalX = Math.min(updated.goalX, maxX);
            } else if (field === "height") {
                const newHeight = Math.max(3, Math.floor(validNum));
                const maxY = Math.max(1, newHeight - 2);
                updated.startY = Math.min(updated.startY, maxY);
                updated.goalY = Math.min(updated.goalY, maxY);
            }

            return updated;
        });
    };

    const generate = () => {
        const mazeWidth = Math.max(3, Math.floor(form.width));
        const mazeHeight = Math.max(3, Math.floor(form.height));

        const maxX = Math.max(1, mazeWidth - 2);
        const maxY = Math.max(1, mazeHeight - 2);

        const options: MazeOptions = {
            alternativePathChance: Math.min(
                1,
                Math.max(0, form.alternativePathChance)
            ),

            maxInfinitePathObstacles: Math.max(
                0,
                Math.floor(form.maxInfinitePathObstacles)
            ),

            obstacleDensityMultiplier: Math.max(
                0,
                form.obstacleDensityMultiplier
            ),

            startPosition: {
                x: Math.min(Math.max(1, Math.floor(form.startX)), maxX),
                y: Math.min(Math.max(1, Math.floor(form.startY)), maxY),
            },

            goalPosition: {
                x: Math.min(Math.max(1, Math.floor(form.goalX)), maxX),
                y: Math.min(Math.max(1, Math.floor(form.goalY)), maxY),
            },
        };

        if (form.seed.trim() !== "") {
            options.seed = Math.floor(Number(form.seed));
        }

        onGenerate(mazeWidth, mazeHeight, options);
    };

    const randomizeSeed = () => {
        setForm(prev => ({
            ...prev,
            seed: Math.floor(Math.random() * 1_000_000).toString(),
        }));
    };

    return (
        <section className={styles.container}>
            <div className={styles.maze_container}>
                <RenderMaze mazeData={mazeData}/>
            </div>  
            <div className={styles.option_container}>
                <div className={styles.header}>
                    <h2>Maze Generator </h2>
                    <small>Active Seed: {mazeData.seed}</small>

                    <button
                        type="button"
                        onClick={generate}
                        className="counter"
                    >
                        Generate Maze
                    </button>
                </div>

                <div className={styles.grid}>
                    <div className={styles.field}>
                        <label htmlFor="maze-width">Width</label>
                        <input
                            id="maze-width"
                            type="number"
                            min={3}
                            step={2}
                            value={form.width}
                            onChange={e => updateNumber("width", e.target.value)}
                        />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="maze-height">Height</label>
                        <input
                            id="maze-height"
                            type="number"
                            min={3}
                            step={2}
                            value={form.height}
                            onChange={e => updateNumber("height", e.target.value)}
                        />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="maze-seed">Seed</label>
                        <div className={styles.input_with_button}>
                            <input
                                id="maze-seed"
                                type="number"
                                value={form.seed}
                                placeholder="Random"
                                onChange={e =>
                                    setForm(prev => ({
                                        ...prev,
                                        seed: e.target.value,
                                    }))
                                }
                            />
                            <button
                                type="button"
                                onClick={randomizeSeed}
                                title="Generate random seed"
                            >
                                🎲
                            </button>
                        </div>
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="alternative-path-chance">Alternative Path Chance</label>
                        <input
                            id="alternative-path-chance"
                            type="number"
                            min={0}
                            max={1}
                            step={0.01}
                            value={form.alternativePathChance}
                            onChange={e => updateNumber("alternativePathChance", e.target.value)}
                        />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="obstacle-density">Obstacle Density</label>
                        <input
                            id="obstacle-density"
                            type="number"
                            min={0}
                            step={0.05}
                            value={form.obstacleDensityMultiplier}
                            onChange={e => updateNumber("obstacleDensityMultiplier", e.target.value)}
                        />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="max-infinite-obstacles">Max Infinite Obstacles</label>
                        <input
                            id="max-infinite-obstacles"
                            type="number"
                            min={0}
                            step={1}
                            value={form.maxInfinitePathObstacles}
                            onChange={e => updateNumber("maxInfinitePathObstacles", e.target.value)}
                        />
                    </div>
                </div>

                <div className={styles.position_section}>
                    <h3>Start Position</h3>
                    <div className={styles.position_grid}>
                        <div className={styles.field}>
                            <label htmlFor="start-x">X</label>
                            <input
                                id="start-x"
                                type="number"
                                min={1}
                                max={Math.max(1, form.width - 2)}
                                value={form.startX}
                                onChange={e => updateNumber("startX", e.target.value)}
                            />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="start-y">Y</label>
                            <input
                                id="start-y"
                                type="number"
                                min={1}
                                max={Math.max(1, form.height - 2)}
                                value={form.startY}
                                onChange={e => updateNumber("startY", e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.position_section}>
                    <h3>Goal Position</h3>
                    <div className={styles.position_grid}>
                        <div className={styles.field}>
                            <label htmlFor="goal-x">X</label>
                            <input
                                id="goal-x"
                                type="number"
                                min={1}
                                max={Math.max(1, form.width - 2)}
                                value={form.goalX}
                                onChange={e => updateNumber("goalX", e.target.value)}
                            />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="goal-y">Y</label>
                            <input
                                id="goal-y"
                                type="number"
                                min={1}
                                max={Math.max(1, form.height - 2)}
                                value={form.goalY}
                                onChange={e => updateNumber("goalY", e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}