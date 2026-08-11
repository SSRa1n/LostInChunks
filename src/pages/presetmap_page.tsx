import { PRESETS } from "../presets/map_presets";
import SingularView from "../components/singular_view/singular_view";   

export default function PresetmapPage() {
    return (
        <div className="presetmap-page">
            <h1>Preset Maps</h1>
            {/* <RenderMaze maze={PRESETS[0]} renderCost={true} /> */}
            <div className="presetmap-grid">
                <SingularView maze={PRESETS[0]} renderCost={true} />
            </div>
        </div>
    );
}