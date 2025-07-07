import { Link } from "react-router-dom";

export default function Lesson() {
    return (
        <div className="container">
            <div className="header">
                <Link to={"/"}>X</Link>
                <div className="progress-bar">
                    <div className="bar"></div>
                    <div className="progress"></div>
                </div>

                <div></div>
            </div>

            <div className="content">
                <h1>Select one option</h1>

                <div className="options">
                    <div className="option">
                        <p>Option 1</p>
                    </div>

                    <div className="option">
                        <p>Option 2</p>
                    </div>

                    <div className="option">
                        <p>Option 3</p>
                    </div>
                </div>
            </div>

            <div className="footer">
                <button className="secondary-btn">Next</button>
                <button className="primary-btn">Verify</button>
            </div>
        </div>
    );
}
