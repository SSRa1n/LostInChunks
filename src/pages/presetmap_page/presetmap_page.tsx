import { useState } from "react";

import { PRESETS } from "../../presets/map_presets";
import ComparisonView from "../../components/comparison_view/comparison_view";
import { enrichPreset } from "../../lib/generate_maze";
import SectionIndicator from "../../components/section_indicator/section_indicator";

import { useSectionNavigation } from "../../lib/use_section_navigation";
import { getSectionState } from "../../lib/section_navigation";

import styles from "./presetmap_page.module.css";

const sections = [
    {
        id: 1,
        title: "Preset Map",
    },
];

export default function PresetmapPage() {
    const [selectedPresetIndex, setSelectedPresetIndex] = useState(0);

    const {activeIndex, direction, goToIndex} = useSectionNavigation(sections.length);

    return (
        <div className={styles.presetmapPage}>
            <div className={styles.sections}>
                {sections.map((section, index) => {
                    const state = getSectionState(index, activeIndex, direction);

                    return (
                        <section
                            key={section.id}
                            className={styles[state]}
                        >
                            <div
                                className={styles.presetSelector}
                            >
                                <select
                                    value={selectedPresetIndex}
                                    onChange={(e) => setSelectedPresetIndex(Number(e.target.value))}
                                >
                                    {PRESETS.map(
                                        (_, index) => (
                                            <option
                                                key={index}
                                                value={index}
                                            >
                                                Preset #
                                                {index + 1}
                                            </option>
                                        )
                                    )}
                                </select>
                            </div>

                            <ComparisonView
                                mazeData={enrichPreset(
                                    PRESETS[selectedPresetIndex]
                                )}
                                showRegenButton={false}
                            />
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