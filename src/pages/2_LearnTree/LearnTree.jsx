import InteractiveBoard from "./InteractiveBoard.jsx";

import './LearnTree.css';

export default function LearnTree({ topics, treeWidth, onRegenerate, onReset }) {
    const len = topics.length;

    return (
        <>
            <div id="options">
                <button onClick={() => {
                    if (onRegenerate)
                        onRegenerate();
                 }}><p>Regenerate</p></button>
                <button id="reset" onClick={() => {
                    if (onReset)
                        onReset();
                 }}><p>Reset</p></button>
            </div>

            <InteractiveBoard>
                <div style={{position: 'absolute', left: '50%', transform: 'translateX(-50%)'}}>
                    {
                        topics.map((topic, i) => {
                            const numTopicsOnSides = Math.floor(len / 2);
                            const pxBetween = (treeWidth === undefined ? 600 : treeWidth) / (2 * numTopicsOnSides);
                            const isOnLeft = i < numTopicsOnSides;
                            
                            const leftPos = isOnLeft ? (-pxBetween * (numTopicsOnSides - i))
                                            : (pxBetween * (i - numTopicsOnSides));                            
                            return (
                                <p key={i} style={{'position': 'relative', 'left': `${leftPos}px`}}>
                                        {topic}
                                </p>
                            );
                        })
                    }
                </div>
            </InteractiveBoard>
        </>
    );
}