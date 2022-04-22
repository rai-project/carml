import splitIntoRows from "../utils/splitIntoRows";
import FindUniqueNumbers from "../utils/FindUniqueNumbers";
import {useMemo} from "react";
import {ColorGenerator} from "../../ObjectDetection/utils/ColorGenerator";

export default function useImageSegmentationControl(trial) {
  const semanticSegment = trial.results.responses[0].features[0].semantic_segment;
  const rows = useMemo(() => splitIntoRows(semanticSegment.int_mask, semanticSegment.width), []);

  const uniqueNumbers = useMemo(() => FindUniqueNumbers(semanticSegment.int_mask), []);
  const colorMap = useMemo(() => new ColorGenerator().CreateColorMapping(uniqueNumbers), []);

  return {rows, colorMap};
}