import { ReturnButton } from "../../components/ui/primary-button";

export default function EmailConfirmation() {
  return (
    <div className="auth-page-full">
      <div className="content-narrow">
        {/* Envelope SVG */}
        <img
          src="src/assets/email.svg"
          alt="Email icon"
          className="confirm-illustration"
        />

        {/* Text Content */}
        <div className="confirm-text">
          <h1 className="page-title-lg">Thank you!</h1>
          <p className="page-subtitle-lg">Please check your email.</p>
        </div>

        {/* Reset Password Button */}
        <ReturnButton title="Return to Log in" path="/reset-password" />
      </div>
    </div>
  );
}