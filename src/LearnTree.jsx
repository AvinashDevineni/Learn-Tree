export default function LearnTree({ topics }) {
    return (
        <>
            <ul>
                {topics.map((topic, i) => <li key={i}>{topic}</li>)}
            </ul>
        </>
    );
}