import InteractiveBoard from "./InteractiveBoard.jsx";
import LearnTreeNode from "./LearnTreeNode.jsx";

import './LearnTree.css';

export default function LearnTree({ topics, treeWidth, nodeWidth, nodeSpacing, onRegenerate, onReset }) {
    const len = topics.length;

    if (!nodeWidth)
        nodeWidth = 150;
    if (!nodeSpacing)
        nodeSpacing = 30;

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
                {/* Wrapper div is used to make left: 0px the center of the screen */}
                <div style={{position: 'absolute', left: '50%', transform: 'translateX(-50%)'}}>
                    {
                        topics.map((topic, i) => {
                            const numTopicsOnSides = Math.floor(len / 2);
                            const pxBetween = (treeWidth === undefined ? 600 : treeWidth) / (2 * numTopicsOnSides);
                            const isOnLeft = i < numTopicsOnSides;
                            
                            let leftPos;

                            if (isOnLeft) {
                                leftPos = -pxBetween * (numTopicsOnSides - i);
                                leftPos -= nodeSpacing * (numTopicsOnSides - i);
                            }

                            else {
                                leftPos = pxBetween * (i - numTopicsOnSides);
                                leftPos += nodeSpacing * (i - numTopicsOnSides);
                            }

                            leftPos -= nodeWidth / 2;

                            return (
                                <LearnTreeNode key={i} value={topic} size={nodeWidth}
                                 position={{x: leftPos, y: 0}}/>
                            );
                        })
                    }
                </div>
            </InteractiveBoard>
        </>
    );
}