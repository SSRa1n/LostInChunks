import { useEffect, useState } from "react";
import type { MazeOptions, MazeData } from '../../lib/generate_maze'

import styles from "./maze_playground.module.css";
import RenderMaze from "../render_maze/render_maze";

const MAX_WIDTH = 99;
const MAX_HEIGHT = 49;

type MazePlaygroundProps = {
    width: number;
    height: number;
    mazeData: MazeData;
    options?: MazeOptions;
    onGenerate: (width: number, height: number, options: MazeOptions) => void;
};

type FormState = {
    width: number | string;
    height: number | string;
    seed: string;
    alternativePathChance: number;
    maxInfinitePathObstacles: number;
    obstacleDensityMultiplier: number;
    startX: number;
    startY: number;
    goalX: number;
    goalY: number;
    randomizeStart: boolean;
    randomizeGoal: boolean;
};

// Helper to ensure dimensions are always odd numbers within bounds
const toOddRange = (val: number, min: number, max: number) => {
    let n = Math.floor(val);
    if (n % 2 === 0) {
        n += 1; // Bump even numbers up to the next odd number
    }
    const maxOdd = max % 2 === 0 ? max - 1 : max;
    return Math.min(maxOdd, Math.max(min, n));
};

export default function MazePlayground({
    width,
    height,
    mazeData,
    options = {},
    onGenerate,
}: MazePlaygroundProps) {
    const [form, setForm] = useState<FormState>(() => ({
        width: toOddRange(width, 3, MAX_WIDTH),
        height: toOddRange(height, 3, MAX_HEIGHT),
        seed: options.seed?.toString() ?? "",
        alternativePathChance: options.alternativePathChance ?? 0.1,
        maxInfinitePathObstacles: options.maxInfinitePathObstacles ?? 2,
        obstacleDensityMultiplier: options.obstacleDensityMultiplier ?? 1,
        startX: options.startPosition?.x ?? 1,
        startY: options.startPosition?.y ?? toOddRange(height, 3, MAX_HEIGHT) - 2,
        goalX: options.goalPosition?.x ?? toOddRange(width, 3, MAX_WIDTH) - 2,
        goalY: options.goalPosition?.y ?? 1,
        randomizeStart: options.randomizeStart ?? false,
        randomizeGoal: options.randomizeGoal ?? false,
    }));
    const [selectionTarget, setSelectionTarget] = useState<"start" | "goal" | null>(null);

    useEffect(() => {
        setForm(prev => {
            const newWidth = toOddRange(width, 3, MAX_WIDTH);
            const newHeight = toOddRange(height, 3, MAX_HEIGHT);
            const maxX = Math.max(1, newWidth - 2);
            const maxY = Math.max(1, newHeight - 2);

            return {
                ...prev,
                width: newWidth,
                height: newHeight,
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
        setForm(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    const generate = () => {
        const rawWidth = form.width === "" || isNaN(Number(form.width)) ? 15 : Number(form.width);
        const rawHeight = form.height === "" || isNaN(Number(form.height)) ? 11 : Number(form.height);

        const mazeWidth = toOddRange(rawWidth, 3, MAX_WIDTH);
        const mazeHeight = toOddRange(rawHeight, 3, MAX_HEIGHT);

        setForm(prev => ({
            ...prev,
            width: mazeWidth,
            height: mazeHeight,
        }));

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
            randomizeStart: form.randomizeStart,
            randomizeGoal: form.randomizeGoal,
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

    const resetForm = () => {
        const defaultForm: FormState = {
            width: 15,
            height: 11,
            seed: "",
            alternativePathChance: 0.1,
            maxInfinitePathObstacles: 2,
            obstacleDensityMultiplier: 1,
            startX: 1,
            startY: 9,
            goalX: 13,
            goalY: 1,
            randomizeStart: false,
            randomizeGoal: false,
        };

        setForm(defaultForm);
        
        const defaultOptions: MazeOptions = {
            alternativePathChance: defaultForm.alternativePathChance,
            maxInfinitePathObstacles: defaultForm.maxInfinitePathObstacles,
            obstacleDensityMultiplier: defaultForm.obstacleDensityMultiplier,
            startPosition: {
                x: defaultForm.startX,
                y: defaultForm.startY,
            },
            goalPosition: {
                x: defaultForm.goalX,
                y: defaultForm.goalY,
            },
        };

        if (defaultForm.seed.trim() !== "") {
            defaultOptions.seed = Math.floor(Number(defaultForm.seed));
        }

        onGenerate(
            Number(defaultForm.width),
            Number(defaultForm.height),
            defaultOptions
        );
    };

    const selectMazePosition = (x: number, y: number) => {
        if (!selectionTarget) {
            return;
        }

        const mazeY = y + 1;
        const maxX = Math.max(1, Math.floor(Number(form.width || 3)) - 2);
        const maxY = Math.max(1, Math.floor(Number(form.height || 3)) - 2);

        if (x < 1 || x > maxX || mazeY < 1 || mazeY > maxY) {
            return;
        }

        setForm(prev => selectionTarget === "start"
            ? { ...prev, startX: x, startY: mazeY }
            : { ...prev, goalX: x, goalY: mazeY }
        );
        setSelectionTarget(null);
    };

    return (
        <section className={styles.container}>
            <div className={styles.maze_container}>
                <RenderMaze
                    mazeData={mazeData}
                    onCellClick={selectionTarget ? selectMazePosition : undefined}
                />
            </div>  
            <div className={styles.option_container}>
                <div className={styles.header}>
                    <h2>Maze Generator</h2>
                    <small>Active Seed: {mazeData.seed}</small>
                </div>

                <div className={styles.grid}>
                    <div className={styles.field}>
                        <label htmlFor="maze-width">Width</label>
                        <input
                            id="maze-width"
                            type="number"
                            min={3}
                            max={MAX_WIDTH}
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
                            max={MAX_HEIGHT}
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
                        <div className={styles.label_row}>
                            <label htmlFor="alternative-path-chance">Alternative Path Chance</label>
                        </div>
                        <div className={styles.range_group}>
                            <span className={styles.value_badge}>{form.alternativePathChance}</span>
                            <input
                                id="alternative-path-chance"
                                type="range"
                                min={0}
                                max={1}
                                step={0.01}
                                value={form.alternativePathChance}
                                onChange={e => updateNumber("alternativePathChance", e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={styles.field}>
                        <div className={styles.label_row}>
                            <label htmlFor="obstacle-density">Obstacle Density</label>
                        </div>
                        <div className={styles.range_group}>
                            <span className={styles.value_badge}>{form.obstacleDensityMultiplier}x</span>
                            <input
                                id="obstacle-density"
                                type="range"
                                min={0}
                                max={10}
                                step={0.05}
                                value={form.obstacleDensityMultiplier}
                                onChange={e => updateNumber("obstacleDensityMultiplier", e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={styles.field}>
                        <div className={styles.label_row}>
                            <label htmlFor="max-infinite-obstacles">Max Infinite Obstacles</label>
                        </div>
                        <div className={styles.range_group}>
                            <span className={styles.value_badge}>{form.maxInfinitePathObstacles}</span>
                            <input
                                id="max-infinite-obstacles"
                                type="range"
                                min={0}
                                max={100}
                                step={1}
                                value={form.maxInfinitePathObstacles}
                                onChange={e => updateNumber("maxInfinitePathObstacles", e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.position_section}>
                    <div className={styles.position_header}>
                        <h3>Start Position</h3>
                    </div>
                    <div className={styles.position_grid}>
                        <label className={styles.checkbox_label}>
                            <input
                                type="checkbox"
                                checked={form.randomizeStart}
                                onChange={e => setForm(prev => ({ ...prev, randomizeStart: e.target.checked }))}
                            />
                            Randomize
                        </label>
                        <button
                            type="button"
                            className="counter"
                            aria-pressed={selectionTarget === "start"}
                            disabled={form.randomizeStart}
                            onClick={() => setSelectionTarget(
                                selectionTarget === "start" ? null : "start"
                            )}
                        >
                            {selectionTarget === "start" ? "Cancel" : "Set Start"}
                        </button>
                        <div className={styles.field}>
                            <label htmlFor="start-x">X</label>
                            <input
                                id="start-x"
                                type="number"
                                min={1}
                                max={Math.max(1, Number(form.width || 3) - 2)}
                                value={form.startX}
                                disabled={form.randomizeStart}
                                onChange={e => updateNumber("startX", e.target.value)}
                            />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="start-y">Y</label>
                            <input
                                id="start-y"
                                type="number"
                                min={1}
                                max={Math.max(1, Number(form.height || 3) - 2)}
                                value={form.startY}
                                disabled={form.randomizeStart}
                                onChange={e => updateNumber("startY", e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.position_section}>
                    <div className={styles.position_header}>
                        <h3>Goal Position</h3>
                    </div>
                    <div className={styles.position_grid}>
                        <label className={styles.checkbox_label}>
                            <input
                                type="checkbox"
                                checked={form.randomizeGoal}
                                onChange={e => setForm(prev => ({ ...prev, randomizeGoal: e.target.checked }))}
                            />
                            Randomize
                        </label>
                        <button
                            type="button"
                            className="counter"
                            aria-pressed={selectionTarget === "goal"}
                            disabled={form.randomizeGoal}
                            onClick={() => setSelectionTarget(
                                selectionTarget === "goal" ? null : "goal"
                            )}
                        >
                            {selectionTarget === "goal" ? "Cancel" : "Set Goal"}
                        </button>
                        <div className={styles.field}>
                            <label htmlFor="goal-x">X</label>
                            <input
                                id="goal-x"
                                type="number"
                                min={1}
                                max={Math.max(1, Number(form.width || 3) - 2)}
                                value={form.goalX}
                                disabled={form.randomizeGoal}
                                onChange={e => updateNumber("goalX", e.target.value)}
                            />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="goal-y">Y</label>
                            <input
                                id="goal-y"
                                type="number"
                                min={1}
                                max={Math.max(1, Number(form.height || 3) - 2)}
                                value={form.goalY}
                                disabled={form.randomizeGoal}
                                onChange={e => updateNumber("goalY", e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {selectionTarget && (
                    <p className={styles.selection_hint}>
                        Click an interior maze tile to set the {selectionTarget} position.
                        Generate Maze to apply the change.
                    </p>
                )}

                <div className={styles.actions}>
                    <button
                        type="button"
                        onClick={generate}
                        className="counter"
                    >
                        Generate Maze
                    </button>

                    <button
                        type="button"
                        onClick={resetForm}
                        className="counter"
                    >
                        Reset
                    </button>
                </div>
            </div>
        </section>
    );
}