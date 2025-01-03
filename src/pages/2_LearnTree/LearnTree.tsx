import InteractiveBoard from "./InteractiveBoard.jsx";
import LearnTreeNode from "./LearnTreeNode.jsx";

import './LearnTree.css';

interface LearnTreeProps {
    topics: string[];
    treeWidth: number;
    nodeWidth?: number;
    nodeSpacing?: number;
    onRegenerate: () => void;
    onReset: () => void;
}

export default function LearnTree(props: LearnTreeProps) {
    const len = props.topics.length;
    const nodeSpacing = !props.nodeSpacing ? 30 : props.nodeSpacing;
    const nodeWidth = !props.nodeWidth ? 150 : props.nodeWidth;

    return (
        <>
            <div id="options">
                <button onClick={() => {
                    if (props.onRegenerate)
                        props.onRegenerate();
                 }}><p>Regenerate</p></button>
                <button id="reset" onClick={() => {
                    if (props.onReset)
                        props.onReset();
                 }}><p>Reset</p></button>
            </div>

            <InteractiveBoard>
                {/* Wrapper div is used to make left: 0px the center of the screen */}
                <div style={{position: 'absolute', left: '50%', transform: 'translateX(-50%)'}}>
                    {
                        props.topics.map((topic, i) => {
                            const numTopicsOnSides = Math.floor(len / 2);
                            const pxBetween = (props.treeWidth === undefined ? 600 : props.treeWidth) / (2 * numTopicsOnSides);
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