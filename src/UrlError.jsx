import './UrlError.css';

export default function UrlError({ onOkClick }) {
    return (
        <>
            <div className="errorWrapper">
                <div className="error">
                    <h1>URL is invalid</h1>
                    <button id="urlErrorOk" onClick={() => {
                        if (onOkClick)
                            onOkClick();
                    }}>Ok</button>
                </div>
            </div>
        </>
    );
}