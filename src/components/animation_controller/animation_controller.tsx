import styles from './animation_controller.module.css';

type AnimationControllerProps = {
    isPlaying: boolean;
    speedMs: number;
    animationIndex: number;
    maxSteps: number;
    onlySeekBar?: boolean;
    
    onPlayPause: () => void;
    onSpeedChange: (speed: number) => void;
    onSeek: (step: number) => void;
};

export default function AnimationController({ 
    isPlaying, 
    speedMs, 
    animationIndex, 
    maxSteps, 
    onlySeekBar = false,
    onPlayPause, 
    onSpeedChange, 
    onSeek 
}: AnimationControllerProps) {
    return (
        <div className={styles.container}>
            <input 
                type="range" 
                min={0} 
                max={maxSteps} 
                value={animationIndex}
                onChange={(e) => onSeek(Number(e.target.value))}
                className={styles.seekbar}
            />

            {!onlySeekBar && <div className={styles.control_button_container}>
                <div className={styles.speed_container}>
                    <span>Speed:</span>
                    <select 
                        value={speedMs} 
                        onChange={(e) => onSpeedChange(Number(e.target.value))}
                        className={styles.speed_select}
                    >
                        <option value={100}>Slow</option>
                        <option value={20}>Normal</option>
                        <option value={5}>Fast</option>
                    </select>
                </div>

                <button 
                    onClick={onPlayPause} 
                    className={styles.play_button}
                >
                    {isPlaying ? '⏸' : (animationIndex >= maxSteps) ? '⭯' : '▶'}
                </button>
            </div>}
        </div> 
    );
}