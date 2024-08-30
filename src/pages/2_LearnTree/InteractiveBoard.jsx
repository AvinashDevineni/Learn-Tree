import { useState } from "react";
import { useRef } from "react";

import './InteractiveBoard.css';

export default function InteractiveBoard({ children }) {
    const [scale, setScale] = useState(1);
    const [translation, setTranslation] = useState({x: 0, y: 0});

    const boardRef = useRef(null);
    const initialBoardWidth = useRef();
    const initialBoardHeight = useRef();

    const scaleDelta = 0.05;
    const prevMousePos = useRef();

    function handleDragStart(e) {
        prevMousePos.current = {x: e.clientX, y: e.clientY};

        boardRef.current.addEventListener('mousemove', handleDragMove);
        boardRef.current.addEventListener('mouseup', handleMouseUp);
    }

    function handleDragMove(e) {
        let deltaPosition = {x: e.clientX - prevMousePos.current.x, y: e.clientY - prevMousePos.current.y};
        prevMousePos.current = {x: e.clientX, y: e.clientY};

        translation.x += deltaPosition.x;
        translation.y += deltaPosition.y;

        clampTranslation(scale);
    }

    function handleMouseUp(_) {
        boardRef.current.removeEventListener('mousemove', handleDragMove);
        boardRef.current.removeEventListener('mouseup', handleMouseUp);
    }

    function handleWheel(e) {
        if (e.deltaY < 0) {
            setScale(scale => {
                const newScale = scale + scaleDelta;
                clampTranslation(newScale);
                return newScale;
            });
        }

        else {
            setScale(scale => {
                const newScale = (scale - scaleDelta) < 1 ? 1 : (scale - scaleDelta);
                clampTranslation(newScale);
                return newScale;
            });
        }
    }

    function clampTranslation(scale) {
        const xBound = initialBoardWidth.current * (scale - 1) / 2;
        const yBound = initialBoardHeight.current * (scale - 1) / 2;
        
        translation.x = clamp(translation.x, -xBound, xBound);
        translation.y = clamp(translation.y, -yBound, yBound);

        setTranslation({...translation});
    }

    function clamp(initial, min, max) {
        let val = initial;
        if (val < min)
            val = min;

        else if (val > max)
            val = max;

        return val;
    }

    return (
        <>
            <div ref={ref => {
                if (boardRef.current !== null)
                    return;

                boardRef.current = ref;
                initialBoardWidth.current = ref.getBoundingClientRect().width;
                initialBoardHeight.current = ref.getBoundingClientRect().height;
             }} id="interactiveBoard" onMouseDown={handleDragStart} onWheel={handleWheel}
             style={{transform: `translateX(${translation.x}px) translateY(${translation.y}px) scale(${scale})`}}>
                {children}
            </div>
        </>
    );
}