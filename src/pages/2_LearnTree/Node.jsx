import './Node.css';

export default function TreeNode({ value, position }) {
    if (position === undefined)
        position = {x: 100, y: 100}

    return (
        <>
            <div className="node" style={{top: `${position.y}px`, left: `${position.x}px`}}>
                <p>{value}</p>
            </div>
        </>
    )
}