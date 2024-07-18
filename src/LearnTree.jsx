import { useEffect } from "react";

export default function LearnTree({ topics }) {
    useEffect(() => console.log(topics))

    return (
        <>
            <ul>
                {topics.map((topic, i) => <li key={i}>{topic}</li>)}
            </ul>
        </>
    );
}