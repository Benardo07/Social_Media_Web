import "./dialog.scss";

const Dialog = ({ type, message }) => {
    return (
        <div id="container">
            {type === "success" ? (
                <div id="success-box">
                    <div className="dot"></div>
                    <div className="dot two"></div>
                    <div className="face">
                        <div className="eye"></div>
                        <div className="eye right"></div>
                        <div className="mouth happy"></div>
                    </div>
                    <div className="shadow scale"></div>
                    <div className="message">
                        <h1 className="alert">Success!</h1>
                        <p>{message}</p>
                    </div>
                    
                </div>
            ) : (
                <div id="error-box">
                    <div className="dot"></div>
                    <div className="dot two"></div>
                    <div className="face2">
                        <div className="eye"></div>
                        <div className="eye right"></div>
                        <div className="mouth sad"></div>
                    </div>
                    <div className="shadow move"></div>
                    <div className="message">
                        <h1 className="alert">Error!</h1>
                        <p>{message}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dialog;
