export function getSectionState(
    index: number,
    activeIndex: number,
    direction: "up" | "down"
) {
    const isActive = index === activeIndex;

    if (isActive) {
        return "page-active";
    }

    if (index === activeIndex - 1 && direction === "down") {
        return "exit-up";
    }

    if (index === activeIndex + 1 && direction === "up") {
        return "exit-down";
    }

    if (index < activeIndex) {
        return "exit-up";
    }

    return "exit-down";
}