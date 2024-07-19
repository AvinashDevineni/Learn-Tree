import { useEffect, useState } from "react"

import './Generation.css';

export default function Generation({ maxNumDots, initialNumDots, secsToUpdate, onInit }) {
    const [numDots, setNumDots] = useState(initialNumDots === undefined ? 0 : initialNumDots);

    useEffect(() => {
        initialNumDots = initialNumDots === undefined ? 0 : initialNumDots;
        maxNumDots = maxNumDots === undefined ? 3 : maxNumDots;
        secsToUpdate = secsToUpdate === undefined ? 0.5 : secsToUpdate;

        const interval = setInterval(() => {
            setNumDots(numDots => {
                let res = null;
                if (numDots === maxNumDots)
                    res = initialNumDots;
                else res = numDots + 1;

                return res;
            });
        }, secsToUpdate * 1000);

        if (onInit)
            onInit();

        return () => clearInterval(interval);
    }, []);
    
    return (
        <>
            <p id="generating">
                Generating
                {Array.from({length: numDots}).map((_, i) => <p key={i} style={{margin: '0px', padding: '0px', display: 'inline'}}>.</p>)}
            </p>
        </>
    );
}