import { Link } from "react-router-dom";
import { useState } from "react";
import type {
  authBtnComponent,
  primaryBtnComponent,
  socialBtnComponent,
  showPassBtnComponent,
  returnBtnComponent,
} from "../../types/componentTypes";

export default function AuthButton({ path, title }: authBtnComponent) {
  return (
    <Link className="auth-btn" to={`${path}`}>
      {title}
    </Link>
  );
}

export function PrimaryButton({ title, onClick }: primaryBtnComponent) {
  return (
    <button className="btn-primary" onClick={onClick}>
      {title}
    </button>
  );
}

export function SocialButton({ title, social, alt }: socialBtnComponent) {
  return (
    <button className="btn-social">
      <img src={`${social}`} alt={alt} className="social-icon" />
      <span className="social-text">{title}</span>
    </button>
  );
}

export function ShowPasswordButton({ onClick }: showPassBtnComponent) {
  const [isActive, setIsActive] = useState(false);

  return (
    <button
      type="button"
      className="password-toggle-btn"
      onClick={() => {
        onClick();
        setIsActive(!isActive);
      }}
    >
      <img
        className={isActive ? "eye-active" : "eye-inactive"}
        src={isActive ? "src/assets/eye.png" : "src/assets/eye-closed.png"}
        alt={isActive ? "eye" : "closed eye"}
      />
    </button>
  );
}

export function ReturnButton({ path, title }: returnBtnComponent) {
  return (
    <Link className="btn-return" to={`${path}`}>
      {title}
    </Link>
  );
}