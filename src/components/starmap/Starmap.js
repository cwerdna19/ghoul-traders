import { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router";
import { Stage, Layer, Rect, Circle } from "react-konva";

import { useRateLimit } from "../../api/useRateLimit.js";

import systems from "../../data/systems.json";

function Starmap() {
    const [localStorageUserToken, setLocalStorageUserToken, isLoggedIn, setIsLoggedIn] = useOutletContext();

    const [stage, setStage] = useState({
        scale: .1,
        x: 0,
        y: 0
    });

    const [systemCircles, setSystemCircles] = useState();

    const handleWheel = (e) => {
        e.evt.preventDefault();
    
        const scaleBy = .95;
        const stage = e.target.getStage();
        const oldScale = stage.scaleX();
        const mousePointTo = {
            x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
            y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale
        };
    
        const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;
    
        setStage({
            scale: newScale,
            x: (stage.getPointerPosition().x / newScale - mousePointTo.x) * newScale,
            y: (stage.getPointerPosition().y / newScale - mousePointTo.y) * newScale
        });
        console.log(stage.getPointerPosition().x, stage.getPointerPosition().y)
    };

    useEffect( () => {
        setSystemCircles(systems.map( system => { 
            system.x = system.x
            system.y = system.y
            console.log(system.x, system.y)
            return (
                <Circle
                    // key={`${system.x}-${system.y}`}
                    x={system.x}
                    y={system.y}
                    width={10}
                    height={10}
                    fill="red"
                />
            )}));
    }, []);


    return (
        <>
            <Stage
                width={window.innerWidth}
                height={window.innerHeight}
                onWheel={handleWheel}
                scaleX={stage.scale}
                scaleY={stage.scale}
                x={stage.x}
                y={stage.y}
                style={{backgroundColor: "black"}}
                draggable
            >
                <Layer
                    offsetX={-15500}
                    offsetY={-15500}
                >
                    {systemCircles}
                </Layer>
            </Stage>
        </>
    )

}

export default Starmap;