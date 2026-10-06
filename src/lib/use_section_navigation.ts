import { useCallback, useEffect, useRef, useState } from "react";

type Direction = "up" | "down";

export function useSectionNavigation(sectionCount: number) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState<Direction>("down");

    const scrollCooldown = useRef(false);

    const goToIndex = useCallback(
        (index: number, dir?: Direction) => {
            if (index < 0 || index >= sectionCount) return;
            if (index === activeIndex) return;

            const newDirection =
                dir ?? (index > activeIndex ? "down" : "up");

            setActiveIndex(index);
            setDirection(newDirection);
        },
        [activeIndex, sectionCount]
    );

    useEffect(() => {
        const handleWheel = (event: WheelEvent) => {
            event.preventDefault();

            if (scrollCooldown.current) return;

            scrollCooldown.current = true;

            window.setTimeout(() => {
                scrollCooldown.current = false;
            }, 400);

            if (event.deltaY > 0) {
                goToIndex(activeIndex + 1, "down");
            } else if (event.deltaY < 0) {
                goToIndex(activeIndex - 1, "up");
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (scrollCooldown.current) return;

            if (
                event.key !== "ArrowDown" &&
                event.key !== "ArrowUp"
            ) {
                return;
            }

            event.preventDefault();

            scrollCooldown.current = true;

            window.setTimeout(() => {
                scrollCooldown.current = false;
            }, 400);

            if (event.key === "ArrowDown") {
                goToIndex(activeIndex + 1, "down");
            } else if (event.key === "ArrowUp") {
                goToIndex(activeIndex - 1, "up");
            }
        };

        window.addEventListener("wheel", handleWheel, {
            passive: false,
        });

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("wheel", handleWheel);
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [activeIndex, goToIndex]);

    return {
        activeIndex,
        direction,
        goToIndex,
    };
}