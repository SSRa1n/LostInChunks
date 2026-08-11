import { PRESETS } from "../presets/map_presets";
import ComparisonView from "../components/comparison_view/comparison_view";

export default function PresetmapPage() {
    return (
        <div className="presetmap-page">
            <h1>Preset Maps</h1>
            <ComparisonView maze={PRESETS[0]}/>
        </div>
    );
}