import { useEffect, useState } from "react"

export default function Generation({ maxNumDots, initialNumDots, secsToUpdate, onInit }) {
    const [dots, setDots] = useState(Array.from({ length: initialNumDots === undefined ? 0 : initialNumDots },
                                     (_, i) => i));

    useEffect(() => {
        if (maxNumDots === undefined)
            maxNumDots = 3;

        if (secsToUpdate === undefined)
            secsToUpdate = 0.5;

        const interval = setInterval(() => {
            setDots(dots => {
                let res = null;
                if (dots.length === maxNumDots)
                    res = Array.from({ length: initialNumDots === undefined ? 0 : initialNumDots },
                                     (_, i) => i);
                else res = dots.concat(dots.length);

                return res;
            });
        }, secsToUpdate * 1000);

        if (onInit)
            onInit();

        return () => clearInterval(interval);
    }, []);
    
    return (
        <>
            <h1>
                Generating
                {dots.map(_ => <p style={{margin: '0px', padding: '0px', display: 'inline'}}>.</p>)}
            </h1>
        </>
    )
}