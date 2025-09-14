import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { hideSidebar, showNavbar } from "../slices/menuSlice";

export default function Terms() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(showNavbar());
        dispatch(hideSidebar());
    }, []);

    return (
        <div className="terms-page">
            <div className="terms-container">
                <h1 className="terms-title">
                    Terms and Conditions of Service for <span className="terms-title-accent">Young Explorers</span>
                </h1>
                <p className="terms-subtitle">
                    Please note that these Terms and Conditions of Service were last revised on July 21st, 2025.
                </p>

                <div className="terms-item">
                    <h2 className="terms-item-heading">1. Who can use Vembo?</h2>
                    <p className="terms-item-description">
                        You need to be at least 13 years old, or have permission from your parent or guardian.
                    </p>
                </div>

                <div className="terms-item">
                    <h2 className="terms-item-heading">2. Using Vembo</h2>
                    <p className="terms-item-description">
                        Vembo is made for learning history and having fun. Please use it only for yourself and don't try
                        to copy or sell it. Be kind and respectful if you chat or share with others.
                    </p>
                </div>

                <div className="terms-item">
                    <h2 className="terms-item-heading">3. Premium Access</h2>
                    <p className="terms-item-description">
                        Some parts of Vembo are free, and some are Premium. Premium gives you extra stories, animations,
                        and special journeys. Payments are handled safely through the app store.
                    </p>
                </div>

                <div className="terms-item">
                    <h2 className="terms-item-heading">4. Learning Materials</h2>
                    <p className="terms-item-description">
                        Vembo tells you facts about history, so you can learn. Vembo tries its best to be accurate, but
                        remember that it's not the same as learning in school.
                    </p>
                </div>

                <div className="terms-item">
                    <h2 className="terms-item-heading">5. Privacy</h2>
                    <p className="terms-item-description">
                        We collect only a little information to help run the program and serve you better. We never sell
                        your information and we keep your personal details safe.
                    </p>
                </div>

                <div className="terms-item">
                    <h2 className="terms-item-heading">6. Changes</h2>
                    <p className="terms-item-description">
                        Sometimes we will update these rules. If you keep using Vembo after changes, it means you agree
                        to them.
                    </p>
                </div>

                <div className="terms-item">
                    <h2 className="terms-item-heading">7. Questions</h2>
                    <p className="terms-item-description">
                        If you or your parent/guardian have questions, email us at: support@vembo.app
                    </p>
                </div>

                <div className="terms-divider" />

                <p className="terms-bottom">By creating an account or using Vembo, you agree to follow these rules.</p>
            </div>
        </div>
    );
}
