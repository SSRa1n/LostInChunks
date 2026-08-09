import { PRESETS } from "../../presets/map_presets";
import RenderMaze from "../../lib/render_maze";

export default function PresetmapPage() {
    return (
        <div className="presetmap-page">
            <h1>Preset Maps</h1>
            <RenderMaze maze={PRESETS[0]} renderCost={true} />
        </div>
    );
}