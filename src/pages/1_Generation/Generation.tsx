import { useEffect, useState } from "react"

import './Generation.css';

interface GenerationProps {
    initialNumDots?: number;
    maxNumDots?: number;
    secsToUpdate?: number;
    onInit?: () => void;
    onInitCleanup?: () => void;
}

export default function Generation(props: GenerationProps) {
    const initDots = props.initialNumDots === undefined ? 0 : props.initialNumDots;
    const maxNumDots = props.maxNumDots === undefined ? 3 : props.maxNumDots;
    const secsToUpdate = props.secsToUpdate === undefined ? 0.5 : props.secsToUpdate;

    const [numDots, setNumDots] = useState(initDots);

    useEffect(() => {
        const interval = setInterval(() => {
            setNumDots(numDots => {
                let res = null;
                if (numDots === maxNumDots)
                    res = initDots;
                else res = numDots + 1;

                return res;
            });
        }, secsToUpdate * 1000);

        if (props.onInit)
            props.onInit();

        return () => {
            clearInterval(interval);
            if (props.onInitCleanup)
                props.onInitCleanup();
        };
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
