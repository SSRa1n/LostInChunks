import { PRESETS } from "../../presets/map_presets";
import ComparisonView from "../../components/comparison_view/comparison_view";
import { enrichPreset } from "../../lib/generate_maze";

export default function PresetmapPage() {
    return (
        <div className="presetmap-page">
            <h1>Preset Maps</h1>
            <ComparisonView mazeData={enrichPreset(PRESETS[0])}/>
        </div>
    );
}