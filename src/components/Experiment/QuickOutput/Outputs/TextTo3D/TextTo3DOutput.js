import React from "react";

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

import useBEMNaming from "../../../../../common/useBEMNaming";
import Task from "../../../../../helpers/Task";
import { textTo3D } from "../../../../../helpers/TaskIDs";

import Rating from "../Classification/Rating";
import OutputDuration from "../_Common/components/OutputDuration";
import OBJComponent from "../ImageTo3D/OBJComponent";
import TextOutputInputSection from "../Text/TextOutputInputSection";
import useTextOutput from "../Text/useTextOutput";

import "./TextTo3D.scss";

export default function TextTo3DOutput(props) {
    const { getElement, getBlock } = useBEMNaming('text-to-3d');

    const task = Task.getStaticTask(textTo3D);

    const { 
        output,
        inferenceDuration, 
        input, 
        setInput 
    } = useTextOutput(
        props.trial
    );

    const onSubmit = () => {
        props.onSubmit(input);
    };    

    return (
        <div className={getBlock()}>
            <div className={getElement("header")}>
                <div className={getElement("header-row")}>
                    <h3 className={getElement("header-heading")}>Try This Model</h3>
                </div>
            </div>

            <div className={getElement("content")}>
                <TextOutputInputSection
                    input={input}
                    setInput={setInput}
                    onSubmit={onSubmit}
                />

                <div className={getElement("output")}>
                    <div className={getElement("output-title-row")}>
                        <h3 className={getElement('title')}>Output</h3>
                        <OutputDuration duration={inferenceDuration}/>
                    </div>  
                    <p className={getElement("output-subtitle")}>
                        {task.outputText} 
                    </p>
                    <p className={getElement("output-help-text")}>
                        Hover over the model and scroll to zoom, click-and-hold to rotate, right-click-and-hold to drag
                    </p>                    
                    <div className={getElement("output-model")}>
                        <Canvas>
                            {/* Just using the lighting from the BoxExample */}
                            <ambientLight intensity={Math.PI / 2} />
                            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
                            <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
                            
                            <OBJComponent model={output.model} texture={output.texture} />

                            <OrbitControls />                            
                        </Canvas>
                    </div>

                    <Rating />  
                </div>
            </div>
        </div>
    )
}
