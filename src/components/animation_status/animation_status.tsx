import styles from './animation_status.module.css';

type AnimationStatusProps = {
    found: boolean;
    status: string;
    animationIndex: number;
    maxSteps: number;
    pathLength: number;
};

export default function AnimationStatus({
    found,
    status,
    animationIndex,
    maxSteps,
    pathLength,
}: AnimationStatusProps) {
    return (
        <div className={styles.container}>
            <span>
                {!found
                    ? 'No Path'
                    : status === 'playing' && (animationIndex < maxSteps)
                    ? 'Exploring...'
                    : status === 'paused'
                    ? 'Paused'
                    : 'Finished'}
            </span>
            {' | '}
            <span>Explored: {(animationIndex < maxSteps) ? animationIndex : maxSteps} / {maxSteps}</span>
            {' | '}
            <span>Path: {pathLength}</span>
        </div>
    );
}