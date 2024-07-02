import React from "react";

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

import useBEMNaming from "../../../../../common/useBEMNaming";
import Task from "../../../../../helpers/Task";
import { imageTo3D } from "../../../../../helpers/TaskIDs";

import MultiInputPreview from "../../MultiInputPreview";
import Rating from "../Classification/Rating";
import OutputDuration from "../_Common/components/OutputDuration";
import OBJComponent from "./OBJComponent";

import "./ImageTo3D.scss";

// Uncomment these to try out other 3D examples
// import BoxExample from "./BoxExample";
// import RingExample from "./RingExample";


export default function ImageTo3DOutput(props) {
    const { getElement, getBlock } = useBEMNaming('image-to-3d');

    const task = Task.getStaticTask(imageTo3D);

    const inputs = props.trial?.inputs ?? [];
    const output = props.trial?.results?.responses[0]?.features[0] ?? {};
    const duration = props.trial?.results?.duration_for_inference ?? "0s";

    // Note: Used for RingExample
    // const { shadow, frame, diamonds } = useControls({ shadow: '#000000', frame: '#fff0f0', diamonds: '#ffffff' })
    // const env = useEnvironment({ files: 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/peppermint_powerplant_2_1k.hdr' })

    return (
        <div className={getBlock()}>
            <div className={getElement("header")}>
                <div className={getElement("header-row")}>
                    <h3 className={getElement("header-heading")}>Try This Model</h3>
                </div>
            </div>

            <div className={getElement("content")}>
                <div className={getElement("input-and-rating")}>
                    <MultiInputPreview inputs={inputs} onBackClicked={props.onBackClicked} />
                </div>

                <div className={getElement("output")}>
                    <div className={getElement("output-title-row")}>
                        <h3 className={getElement('title')}>Output</h3>
                        <OutputDuration duration={duration}/>
                    </div>  
                    <p className={getElement("output-subtitle")}>
                        {task.outputText}
                    </p>
                    <p className={getElement("output-help-text")}>
                        Hover over the model and scroll to zoom, click-and-hold to rotate, right-click-and-hold to drag
                    </p>                        
                    <div className={getElement("output-model")}>
                        <Canvas>
                            {/* Very basic 3D Box that can be rotated with OrbitControls */}
                            {/* <ambientLight intensity={0.1} />
                            <directionalLight color="red" position={[0, 0, 5]} />
                            <mesh>
                                <boxGeometry args={[2, 2, 2]} />
                                <meshStandardMaterial />                                
                            </mesh> */}

                            {/* Just using the lighting from the BoxExample */}
                            <ambientLight intensity={Math.PI / 2} />
                            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
                            <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
                            
                            {/* Uncomment these to try out other 3D examples */}
                            {/* <BoxExample position={[-1.2, 0, 0]} />
                            <BoxExample position={[1.2, 0, 0]} /> */}
                            {/* There are several other stylings in the original Ring example that aren't being used here */}
                            {/* <RingExample frame="#fff0f0" diamonds="#ffffff" scale={0.18} /> */}

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
