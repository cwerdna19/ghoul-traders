import { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router";
import { Stage, Layer, Rect, Circle, Label, Tag, Text } from "react-konva";

import { useRateLimit } from "../../api/useRateLimit.js";

import systems from "../../data/systems.json";

/*

Have to understand how to use offset and scale to calculate our relative position

*/

function Tooltip() {
    const [localStorageUserToken, setLocalStorageUserToken, isLoggedIn, setIsLoggedIn, node, setNode] = useOutletContext();

    if (node === null) return null;

    return (
        <Label x={node.x} y={node.y} opacity={0.75}>
            <Tag
                fill={"black"}
                pointerDirection={"down"}
                pointerWidth={10 * node.scale}
                pointerHeight={10 * node.scale}
                lineJoin={"round"}
                shadowColor={"black"}
                shadowBlur={10}
                shadowOffsetX={10}
                shadowOffsetY={10}
                shadowOpacity={0.2}
            />
            <Text text={node.text} fill={"white"} fontSize={18} padding={5} />
        </Label>
    );
}

function Starmap() {
    const [localStorageUserToken, setLocalStorageUserToken, isLoggedIn, setIsLoggedIn, node, setNode] = useOutletContext();

    const [stage, setStage] = useState({
        scale: .1,
        x: 0,
        y: 0
    });

    const [tooltipText, setTooltipText] = useState({x: 0, y: 0});

    const [systemCircles, setSystemCircles] = useState();

    useEffect( () => {
        setSystemCircles(systems.map( system => { 
            //system.x = system.x
            //system.y = system.y
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
                onWheel={(e) => {
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
                }}
                scaleX={stage.scale}
                scaleY={stage.scale}
                x={stage.x}
                y={stage.y}
                style={{backgroundColor: "green"}}
                draggable
                onMouseMove={(e) => {
                    var node = e.target;
                    if (node) {
                        // update tooltip
                        var mousePos = node.getStage().getPointerPosition();
                        const stage = e.target.getStage();
                        setNode({
                            x: mousePos.x,
                            y: mousePos.y,
                            scale: stage.scaleX(),
                            text: `${mousePos.x}, ${mousePos.y}`
                        });
                        console.log(`${mousePos.x}, ${mousePos.y}`);
                    }

                }}
            >
                <Layer
                    // offsetX={-15500}
                    // offsetY={-15500}
                >
                    <Tooltip/>
                    {/* {systemCircles} */}
                </Layer>
            </Stage>
        </>
    )

}

export default Starmap;