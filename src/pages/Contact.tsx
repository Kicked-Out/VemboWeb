import { useDispatch } from "react-redux";
import "../styles/contact.css";
import { useEffect } from "react";
import { hideSidebar, showNavbar } from "../slices/menuSlice";

export default function Contact() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(showNavbar());
        dispatch(hideSidebar());
    }, []);

    return (
        <div className="contact-page">
            <h1 className="contact-title">Contact us</h1>
            <p className="contact-text">
                Journalists and bloggers, please reach out to:
                <span className="contact-email"> press@vembo.com</span>
            </p>
            <p className="contact-text">
                Looking to partner with us?
                <span className="contact-email"> partnerships@vembo.com</span>
            </p>
            <img src="/images/contact-bear.png" alt="Vembo bear" className="contact-bear" />
        </div>
    );
}
