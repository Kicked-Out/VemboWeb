import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ToggleSwitch from '../../components/settings/toggle-switch';
import VemboButton from '../../components/settings/vembo-button';
import '../../styles/settings/social.css';
import '../../styles/settings/layout.css';

const SocialAccounts = () => {
    useEffect(() => {
        document.body.classList.add('hide-sidebar', 'settings-page');
        return () => {
            document.body.classList.remove('hide-sidebar', 'settings-page');
        };
    }, []);

    const [connections, setConnections] = useState({ google: true, facebook: true });

    const handleToggleChange = (platform: keyof typeof connections, value: boolean) => {
        setConnections(prev => ({ ...prev, [platform]: value }));
    };

    const handleSaveChanges = () => {
        console.log('Saving social account connections:', connections);
    };

    const GoogleIcon = () => (
        <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_787_4724)">
                <path d="M31.9848 16.809C31.9848 15.457 31.876 14.4704 31.6403 13.4473H16.3188V19.5495H25.3122C25.131 21.066 24.1518 23.3498 21.976 24.8844L21.9455 25.0887L26.7898 28.8702L27.1255 28.904C30.2078 26.0355 31.9848 21.815 31.9848 16.809Z" fill="#4285F4"/>
                <path d="M16.3188 32.8865C20.7248 32.8865 24.4237 31.4248 27.1255 28.9036L21.976 24.884C20.598 25.8523 18.7485 26.5283 16.3188 26.5283C12.0035 26.5283 8.34085 23.66 7.03522 19.6953L6.84385 19.7117L1.8066 23.6398L1.74072 23.8243C4.42422 29.1958 9.93635 32.8865 16.3188 32.8865Z" fill="#34A853"/>
                <path d="M7.03512 19.6958C6.69062 18.6727 6.49125 17.5764 6.49125 16.4437C6.49125 15.3109 6.69063 14.2147 7.017 13.1916L7.00787 12.9737L1.9075 8.98242L1.74063 9.0624C0.634625 11.2914 0 13.7945 0 16.4437C0 19.0929 0.634625 21.5959 1.74063 23.8249L7.03512 19.6958Z" fill="#FBBC05"/>
                <path d="M16.3188 6.35804C19.3831 6.35804 21.4501 7.69177 22.6287 8.80634L27.2342 4.27526C24.4057 1.62607 20.7248 0 16.3188 0C9.93635 0 4.42422 3.69058 1.74072 9.06203L7.0171 13.1912C8.34085 9.22652 12.0035 6.35804 16.3188 6.35804Z" fill="#EB4335"/>
            </g>
            <defs>
                <clipPath id="clip0_787_4724">
                    <rect width="32" height="33" fill="white"/>
                </clipPath>
            </defs>
        </svg>
    );

    const FacebookIcon = () => (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_787_4736)">
                <path d="M32 16C32 7.1635 24.8365 0 16 0C7.1635 0 0 7.1635 0 16C0 23.986 5.851 30.6054 13.5 31.8056V20.625H9.4375V16H13.5V12.475C13.5 8.465 15.8888 6.25 19.5435 6.25C21.294 6.25 23.125 6.5625 23.125 6.5625V10.5H21.1075C19.1199 10.5 18.5 11.7334 18.5 12.9987V16H22.9375L22.2281 20.625H18.5V31.8056C26.149 30.6054 32 23.9861 32 16Z" fill="#1877F2"/>
                <path d="M22.2281 20.625L22.9375 16H18.5V12.9987C18.5 11.7332 19.1199 10.5 21.1075 10.5H23.125V6.5625C23.125 6.5625 21.294 6.25 19.5434 6.25C15.8888 6.25 13.5 8.465 13.5 12.475V16H9.4375V20.625H13.5V31.8056C14.327 31.9352 15.1629 32.0002 16 32C16.8371 32.0002 17.673 31.9352 18.5 31.8056V20.625H22.2281Z" fill="white"/>
            </g>
            <defs>
                <clipPath id="clip0_787_4736">
                    <rect width="32" height="32" fill="white"/>
                </clipPath>
            </defs>
        </svg>
    );

    const location = useLocation();

    return (
        <div className="page-containerr">
            <h1 className="title">Social Accounts</h1>

            <div className="platforms">
                <div className="platform-row">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <GoogleIcon />
                        <span className="platform-name">Google</span>
                    </div>
                    <ToggleSwitch checked={connections.google} onChange={(v) => handleToggleChange('google', v)} />
                </div>

                <div className="platform-row">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <FacebookIcon />
                        <span className="platform-name">Facebook</span>
                    </div>
                    <ToggleSwitch checked={connections.facebook} onChange={(v) => handleToggleChange('facebook', v)} />
                </div>
            </div>

            <div style={{ marginTop: 28 }}>
                <VemboButton variant="primary" size="md" onClick={handleSaveChanges} className="w-49">Save Changes</VemboButton>
            </div>
            <aside className="sidebar-right" aria-label="Settings sidebar">
                <div className="settings-card">
                    <Link to="/settings" className={`settings-link ${location.pathname === "/settings" ? "active" : ""}`}>Profile</Link>
                    <Link to="/privacy" className={`settings-link ${location.pathname.startsWith("/privacy") ? "active" : ""}`}>Privacy settings</Link>
                    <Link to="/social" className={`settings-link ${location.pathname === "/social" ? "active" : ""}`}>Social accounts</Link>
                </div>

                <div>
                    <button className="logout-btn" onClick={() => console.log('Logout clicked')}>
                        <span>Log out</span>
                    </button>
                </div>
            </aside>
        </div>
    );
};

export default SocialAccounts;