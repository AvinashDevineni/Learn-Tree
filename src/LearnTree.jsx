import InteractiveBoard from "./InterctiveBoard";

export default function LearnTree({ topics }) {
    return (
        <>
            <InteractiveBoard>
                <div style={{width: '100px', height: '100px', backgroundColor: 'white', position: 'absolute'}}></div>
            </InteractiveBoard>
        </>
    );
}