import { useRef } from "react"

export default function UrlSubmit({ isValidUrl, onValidSubmit, onInvalidSubmit }) {
    const urlTextRef = useRef('');

    return (
        <>
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
                Submit
            </button>
        </>
    )
}