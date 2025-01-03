import { useRef } from "react"

import './UrlSubmit.css';

interface UrlSubmit {
    onValidSubmit: (input: string) => void;
    onInvalidSubmit: (input: string) => void;
    isValidUrl?: (url: string) => boolean;
}

export default function UrlSubmit(props: UrlSubmit) {
    const urlTextRef = useRef('');

    return (
        <>
            <div id="urlSubmit">
                <label>YouTube Video URL</label>
                <input type="text" onChange={e => urlTextRef.current = e.target.value}/>
                <button onClick={() => {
                    if (!props.isValidUrl)
                        return props.onValidSubmit(urlTextRef.current);

                    if (props.isValidUrl(urlTextRef.current))
                        props.onValidSubmit(urlTextRef.current);
                    else props.onInvalidSubmit(urlTextRef.current);
                }}>
                    <p>Learn</p>
                </button>
            </div>
        </>
    )
}