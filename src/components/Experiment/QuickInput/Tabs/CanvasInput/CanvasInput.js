import {useEffect, useRef, useState} from 'react';
import useBEMNaming from "../../../../../common/useBEMNaming";

import './CanvasInput.scss';


const loadImage = (setImageDimensions, imageUrl) => {
    const img = new Image();
    img.src = imageUrl;
  
    img.onload = () => {
      setImageDimensions({
        height: img.height,
        width: img.width
      });
    };
    img.onerror = (err) => {
      console.log("img error");
      console.error(err);
    };
};

const CanvasInput = (props) => {
    const { getBlock, getElement } = useBEMNaming("canvas-input");

    const inputIndex = props.index;
    const imageUrl = props.url.src ?? props.url;

    const imageRef = useRef(null);
    const canvasRef = useRef(null);
    const contextRef = useRef(null);

    const [isDrawing, setIsDrawing] = useState(false);

    const canvasOffSetX = useRef(null);
    const canvasOffSetY = useRef(null);
    const startX = useRef(null);
    const startY = useRef(null);

    const [rectangleWidth, setRectangleWidth] = useState(0);
    const [rectangleHeight, setRectangleHeight] = useState(0);

    const [imageDimensions, setImageDimensions] = useState({});  // Prob could change this to a boolean?

    useEffect(() => {
        loadImage(setImageDimensions, imageUrl); 
      }, []
    );

    useEffect(() => {
        // This useEffect fires once, when imageDimensions is set, then we use imageRef to get the
        // size of the image as-displayed (rather than )
        const image = imageRef.current;

        const canvas = canvasRef.current;
        canvas.width = image.width;
        canvas.height = image.height;   

        const context = canvas.getContext("2d");
        context.lineCap = "round";
        context.strokeStyle = "#5FA9FF";
        context.lineWidth = 5;
        contextRef.current = context;

        const canvasOffSet = canvas.getBoundingClientRect();
        canvasOffSetX.current = canvasOffSet.top;
        canvasOffSetY.current = canvasOffSet.left;
    }, [imageDimensions]);

    const startDrawingRectangle = ({nativeEvent}) => {
        nativeEvent.preventDefault();
        nativeEvent.stopPropagation();

        startX.current = nativeEvent.offsetX;
        startY.current = nativeEvent.offsetY;        

        setIsDrawing(true);
    };

    const drawRectangle = ({nativeEvent}) => {
        if (!isDrawing) {
            return;
        }

        nativeEvent.preventDefault();
        nativeEvent.stopPropagation();

        const newMouseX = nativeEvent.offsetX;
        const newMouseY = nativeEvent.offsetY;        

        const rectWidth = newMouseX - startX.current;
        const rectHeight = newMouseY - startY.current;
        setRectangleWidth(rectWidth)
        setRectangleHeight(rectHeight)

        contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        contextRef.current.strokeRect(startX.current, startY.current, rectWidth, rectHeight);
    };

    const stopDrawingRectangle = () => {
        setIsDrawing(false);
        
        const dimensions = {
            xmin: startX.current,
            xmax: rectangleWidth,
            ymin: startY.current,
            ymax: rectangleHeight
        };

        props.selectInput(imageUrl, inputIndex, dimensions);
    };

    return (
        <div className={getBlock()}>
            {
                props.tab.id !== "sample-input" && (
                    <p className={getElement("help-text")}>
                        Click and drag to draw a rectangle around the object you wish to identify.
                    </p>
                )
            }

            <div className={getElement("canvas-container")}>
                <img 
                    className={getElement("canvas-background")}
                    src={imageUrl}
                    alt="canvas background" 
                    ref={imageRef}
                />
                <canvas className={getElement("canvas-element")}
                    ref={canvasRef}
                    onMouseDown={startDrawingRectangle}
                    onMouseMove={drawRectangle}
                    onMouseUp={stopDrawingRectangle}
                    onMouseLeave={stopDrawingRectangle} 
                />
            </div>
        </div>

    )
}

export default CanvasInput;

// Note: Based off of this example: 
// https://coolboi567.medium.com/dynamically-get-image-dimensions-from-image-url-in-react-d7e216887b68