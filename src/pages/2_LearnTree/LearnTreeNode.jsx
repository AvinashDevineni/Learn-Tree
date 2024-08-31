import './LearnTreeNode.css';

export default function LearnTreeNode({ value, size, position }) {
    return (
        <>
            <div className="node" style={{
                width: `${size}px`, height: `${size}px`,
                top: `${position.y}px`, left: `${position.x}px`
             }}>
                <p>{value}</p>
            </div>
        </>
    )
}