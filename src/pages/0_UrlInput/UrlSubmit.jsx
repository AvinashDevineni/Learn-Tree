import { useRef } from "react"

import './UrlSubmit.css';

export default function UrlSubmit({ isValidUrl, onValidSubmit, onInvalidSubmit }) {
    const urlTextRef = useRef('');

    return (
        <>
            <div id="urlSubmit">
                <label>YouTube Video URL</label>
                <input type="text" onChange={e => urlTextRef.current = e.target.value}/>
                <button onClick={() => {
                    if (!isValidUrl) {
                        onValidSubmit(urlTextRef.current);
                        return;
                    }

                    if (isValidUrl(urlTextRef.current))
                        onValidSubmit(urlTextRef.current);
                    else onInvalidSubmit(urlTextRef.current);
                }}>
                    <p>Learn</p>
                </button>
            </div>
        </>
    )
}