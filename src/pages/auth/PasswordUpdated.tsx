import { useDispatch } from "react-redux";
import { ReturnButton } from "../../components/ui/primary-button";
import { useEffect } from "react";
import { hideNavbar, hideSidebar } from "../../slices/menuSlice";

export default function PasswordUpdated() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(hideNavbar());
        dispatch(hideSidebar());
    });

    return (
        <div className="auth-overlay">
            <div className="content-narrow">
                <div className="confirm-text">
                    {/* Password Updated Heading */}
                    <h1 className="page-title-lg">
                        <span className="text-white">Password </span>
                        <span className="text-accent">Updated</span>
                        <span className="text-white">!</span>
                    </h1>

                    {/* Success Message */}
                    <p className="page-subtitle-lg message-narrow">
                        <span className="text-white">Your password has been changed successfully. Use your </span>
                        <span className="text-accent">new password</span>
                        <span className="text-white"> to Log in.</span>
                    </p>
                </div>

                {/* Return to Login Button */}
                <ReturnButton title="Return to Log in" path="/" />
            </div>
        </div>
    );
}
