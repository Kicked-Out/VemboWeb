import { Link } from "react-router-dom";

export default function InfoCard() {
    return (
        <div className="info-card">
            <Link to="/about" className="info-card__link">
                About
            </Link>
            <Link to="/terms" className="info-card__link">
                Terms
            </Link>
            <Link to="/contact" className="info-card__link">
                Contact Us
            </Link>
        </div>
    );
}
