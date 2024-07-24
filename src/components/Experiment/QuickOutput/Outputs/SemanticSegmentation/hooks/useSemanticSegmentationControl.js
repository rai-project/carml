import {useHoverControl} from "../../_Common/hooks/useHoverControl";
import {useCategoryFilters} from "../../_Common/hooks/useCategoryFilters";

export default function useSemanticSegmentationControl(trial) {
    const hover = useHoverControl();
    let labelToShow = null;

    const feature = trial.results.responses[0].features[0];
    if (hover.property) {
        labelToShow = feature?.semantic_segment.labels[hover.property] ?? "";
    }

    const image = trial.inputs[0].src;
    const {height, int_mask, labels, width} = feature?.semantic_segment ?? {
        height: 0,
        int_mask: [],
        labels: [],
        width: 0
    };
    const usedLabels = (labels || []).map((label, index) => {
        return index > 0 && int_mask.indexOf(index) > -1
            ? {index: index - 1, label}
            : null;
    }).filter(l => l !== null);

    const categories = useCategoryFilters(usedLabels, "index")


    return {hover, labelToShow, image, height, usedLabels, width, int_mask, categories};
}
