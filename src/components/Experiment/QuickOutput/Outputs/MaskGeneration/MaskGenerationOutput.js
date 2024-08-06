import React from "react";
import useBEMNaming from "../../../../../common/useBEMNaming";

import SemanticSegmentation from "../SemanticSegmentation/SemanticSegmentation";
import Rating from "../Classification/Rating";

import "./MaskGeneration.scss";
import "../../../QuickInput/Tabs/CanvasInput/CanvasInput.scss"


export default function MaskGenerationOutput(props) {
    const { getElement, getBlock } = useBEMNaming('mask-generation-output');

    return (
        <div className={getBlock()}>
            <div className={getElement("header")}>
                <div className={getElement("header-row")}>
                    <h3 className={getElement("header-heading")}>Try This Model</h3>
                </div>
            </div>

            <SemanticSegmentation {...props} />

            <Rating />
        </div>
    )
}
