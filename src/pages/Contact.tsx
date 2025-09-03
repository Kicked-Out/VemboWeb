import "../styles/contact.css";

export default function Contact() {
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
            <img
                src="/images/contact-bear.png"
                alt="Vembo bear"
                className="contact-bear"
            />
        </div>
    );
}
