import { useState, useRef } from "react";

import { PRESETS } from "../../presets/map_presets";
import ComparisonView from "../../components/comparison_view/comparison_view";
import { enrichPreset } from "../../lib/generate_maze";
import SectionIndicator from "../../components/section_indicator/section_indicator";

import styles from "./presetmap_page.module.css";

export default function PresetmapPage() {
    const containerRef = useRef<HTMLDivElement>(null);

    const [selectedPresetIndex, setSelectedPresetIndex] = useState(0);
    return (
        <div className={styles.presetmapPage} ref={containerRef}>
            <section>
                <div className={styles.presetSelector}>
                    <select value={selectedPresetIndex} onChange={(e) => setSelectedPresetIndex(Number(e.target.value))}>
                        {PRESETS.map((_, index) => (
                            <option key={index} value={index}>
                                Preset #{index + 1}
                            </option>
                        ))}
                    </select>
                </div>
                <ComparisonView mazeData={enrichPreset(PRESETS[selectedPresetIndex])} showRegenButton={false}/>
            </section>

            <SectionIndicator containerRef={containerRef} />
        </div>
    );
}