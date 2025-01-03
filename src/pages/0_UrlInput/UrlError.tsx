import './UrlError.css';

interface UrlErrorProps {
    onOkClick: () => void;
}

export default function UrlError(props: UrlErrorProps) {
    return (
        <>
            <div className="errorWrapper">
                <div className="error">
                    <h1>URL is invalid</h1>
                    <button id="urlErrorOk" onClick={() => {
                        if (props.onOkClick)
                            props.onOkClick();
                    }}><p>Ok</p></button>
                </div>
            </div>
        </>
    );
}