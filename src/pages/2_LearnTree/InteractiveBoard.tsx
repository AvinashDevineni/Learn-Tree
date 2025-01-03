import { PropsWithChildren, useState } from "react";
import { useRef } from "react";

import './InteractiveBoard.css';

interface InteractiveBoardProps {
    maxScale?: number;
}

interface Pos {
    x: number;
    y: number;
}

export default function InteractiveBoard(props: PropsWithChildren<InteractiveBoardProps>) {
    const [scale, setScale] = useState(1);
    const [translation, setTranslation] = useState({x: 0, y: 0});

    const boardRef = useRef<HTMLDivElement | null>(null);
    const initialBoardWidth = useRef<number>(0);
    const initialBoardHeight = useRef<number>(0);
    const prevMousePos = useRef<Pos>({ x: 0, y: 0 });

    const scaleDelta = 0.05;
    const maxScale = !props.maxScale ? 1.5 : props.maxScale;

    function handleDragStart(e: React.MouseEvent<HTMLDivElement>) {
        prevMousePos.current = {x: e.clientX, y: e.clientY};

        if (boardRef.current != null) {
            boardRef.current.addEventListener('mousemove', handleDragMove);
            boardRef.current.addEventListener('mouseup', handleMouseUp);
        }
    }

    function handleDragMove(e: MouseEvent) {
        let deltaPosition = {x: e.clientX - prevMousePos.current.x, y: e.clientY - prevMousePos.current.y};
        prevMousePos.current = {x: e.clientX, y: e.clientY};

        translation.x += deltaPosition.x;
        translation.y += deltaPosition.y;

        clampTranslation(scale);
    }

    function handleMouseUp() {
        if (boardRef.current != null) {
            boardRef.current.removeEventListener('mousemove', handleDragMove);
            boardRef.current.removeEventListener('mouseup', handleMouseUp);
        }
    }

    function handleWheel(e: React.WheelEvent<HTMLDivElement>) {
        if (e.deltaY < 0) {
            setScale(scale => {
                const newScale = clamp(scale + scaleDelta, 1, maxScale);
                clampTranslation(newScale);
                return newScale;
            });
        }

        else {
            setScale(scale => {
                const newScale = clamp(scale - scaleDelta, 1, maxScale);
                clampTranslation(newScale);
                return newScale;
            });
        }
    }

    function clampTranslation(scale: number) {
        const xBound = initialBoardWidth.current * (scale - 1) / 2;
        const yBound = initialBoardHeight.current * (scale - 1) / 2;
        
        translation.x = clamp(translation.x, -xBound, xBound);
        translation.y = clamp(translation.y, -yBound, yBound);

        setTranslation({...translation});
    }

    function clamp(initial: number, min: number, max: number) {
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
                if (ref == null)
                    return;

                boardRef.current = ref;
                initialBoardWidth.current = ref.getBoundingClientRect().width;
                initialBoardHeight.current = ref.getBoundingClientRect().height;
             }} id="interactiveBoard" onMouseDown={handleDragStart} onWheel={handleWheel}
             style={{transform: `translateX(${translation.x}px) translateY(${translation.y}px) scale(${scale})`}}>
                {props.children}
            </div>
        </>
    );
}