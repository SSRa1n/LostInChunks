import { useState, useEffect } from 'react';

export type AnimationResult = {
    animationIndex: number;
    isAnimating: boolean;
    status: string;
    speedMs: number;
    isUserControlled: boolean;
    handleSeek: (index: number) => void;
    togglePlay: () => void;
    changeSpeed: (newSpeed: number) => void;
};

export function useAnimation(maxSteps: number, defaultSpeedMs = 20, resetKey?: string) {
    const [animationIndex, setAnimationIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(true);
    const [speedMs, setSpeedMs] = useState(defaultSpeedMs);
    const [isUserControlled, setIsUserControlled] = useState(false);

    useEffect(() => {
        setAnimationIndex(0);
        setIsUserControlled(false);
        setIsAnimating(true);
    }, [maxSteps, resetKey]);

    useEffect(() => {
        if (!isAnimating) return;

        const interval = setInterval(() => {
            setAnimationIndex((prev) => {
                if (prev >= maxSteps) {
                    setIsAnimating(false);
                    return prev;
                }

                return prev + 1;
            });
        }, speedMs);

        return () => clearInterval(interval);
    }, [isAnimating, speedMs, maxSteps]);

    const handleSeek = (index: number) => {
        const clampedIndex = Math.max(0, Math.min(index, maxSteps));

        setAnimationIndex(clampedIndex);
        setIsUserControlled(true);
        setIsAnimating(false);
    };

    const togglePlay = () => {
        if (animationIndex >= maxSteps) {
            setAnimationIndex(0);
            setIsAnimating(true);
            setIsUserControlled(false);
            return;
        }

        setIsAnimating((prev) => !prev);
        setIsUserControlled(false);
    };

    const changeSpeed = (newSpeed: number) => {
        setSpeedMs(newSpeed);
    };

    const isFinished = animationIndex >= maxSteps;

    const status =
        isFinished
            ? 'finished'
            : isAnimating
                ? 'playing'
                : 'paused';

    return {
        animationIndex,
        isAnimating,
        status,
        speedMs,
        isUserControlled,
        handleSeek,
        togglePlay,
        changeSpeed,
    };
}