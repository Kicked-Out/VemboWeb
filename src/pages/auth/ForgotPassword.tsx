import { PrimaryButton } from "../../components/ui/primary-button";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSubmit = () => {
        if (email.trim()) {
        navigate("/email-confirmation");
        }
    };

    return (
        <div className="auth-page">
        <div className="content-wide">
            <div className="section-wide">
            {/* Header Text */}
            <div className="header-block">
                <h1 className="page-title-lg">Forgot password</h1>
                <p className="page-subtitle-lg">
                    We will send you instructions on how to reset your password by email.
                </p>
            </div>

            {/* Form Section */}
            <div className="form-section-left">
                <div className="form-fields-left">
                {/* Email Input */}
                <div className="input-group">
                    <div className="input-container">
                    <div className="input-box" />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input"
                        placeholder="E-mail or Username"
                    />
                    </div>
                </div>

                {/* Submit Button */}
                <PrimaryButton title="SUBMIT" onClick={handleSubmit} />
                </div>
            </div>

            {/* Bottom Links */}
            <div className="bottom-links">
                <Link to="/" className="link-white">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                        <path d="M14.7066 11.3733C14.8048 11.2818 14.8837 11.1714 14.9383 11.0487C14.993 10.9261 15.0224 10.7936 15.0247 10.6594C15.0271 10.5251 15.0024 10.3917 14.9521 10.2672C14.9018 10.1427 14.8269 10.0296 14.732 9.93462C14.637 9.83966 14.5239 9.7648 14.3994 9.7145C14.2749 9.66421 14.1415 9.63951 14.0072 9.64188C13.873 9.64425 13.7405 9.67364 13.6179 9.72829C13.4952 9.78295 13.3848 9.86175 13.2933 9.96L7.95993 15.2933C7.77267 15.4808 7.66748 15.735 7.66748 16C7.66748 16.265 7.77267 16.5192 7.95993 16.7067L13.2933 22.04C13.3848 22.1383 13.4952 22.2171 13.6179 22.2717C13.7405 22.3264 13.873 22.3558 14.0072 22.3581C14.1415 22.3605 14.2749 22.3358 14.3994 22.2855C14.5239 22.2352 14.637 22.1603 14.732 22.0654C14.8269 21.9704 14.9018 21.8573 14.9521 21.7328C15.0024 21.6083 15.0271 21.4749 15.0247 21.3406C15.0224 21.2064 14.993 21.0739 14.9383 20.9513C14.8837 20.8286 14.8048 20.7182 14.7066 20.6267L11.0799 17H23.9999C24.2652 17 24.5195 16.8946 24.707 16.7071C24.8946 16.5196 24.9999 16.2652 24.9999 16C24.9999 15.7348 24.8946 15.4804 24.707 15.2929C24.5195 15.1054 24.2652 15 23.9999 15H11.0799L14.7066 11.3733Z" fill="#F5FAFF"/>
                    </svg>
                    <span>Go back</span>
                </Link>

                <button className="btn-text">Resend letter</button>
            </div>
            </div>
        </div>
        </div>
    );
}