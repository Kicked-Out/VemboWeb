import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import VemboButton from '../../components/settings/vembo-button';
import ToggleSwitch from '../../components/settings/toggle-switch';
import '../../styles/settings/privacy.css';
import '../../styles/settings/layout.css';

const PrivacySettings = () => {
    useEffect(() => {
        document.body.classList.add('hide-sidebar', 'settings-page');
        return () => {
            document.body.classList.remove('hide-sidebar', 'settings-page');
        };
    }, []);

    const location = useLocation();
    const [settings, setSettings] = useState({
        makeProfilePublic: true,
        personalisedAds: true
    });

    const handleToggleChange = (setting: keyof typeof settings, value: boolean) => {
        setSettings(prev => ({ ...prev, [setting]: value }));
    };

    const handleSaveChanges = () => {
        console.log('Saving privacy settings:', settings);
    };

    return (
        <div className="page-containerr">
            <h1 className="title">Privacy Settings</h1>

            <div className="settings-list">
                <div className="setting-row">
                    <div className="setting-text">
                        <h3 className="setting-title">Make my profile public</h3>
                        <p className="setting-desc">Enrolls you in public leaderboards.</p>
                    </div>
                    <ToggleSwitch checked={settings.makeProfilePublic} onChange={(v) => handleToggleChange('makeProfilePublic', v)} />
                </div>

                <div className="setting-row">
                    <div className="setting-text">
                        <h3 className="setting-title">Personalised ads</h3>
                        <p className="setting-desc">Tracking and personalization for advertising.</p>
                    </div>
                    <ToggleSwitch checked={settings.personalisedAds} onChange={(v) => handleToggleChange('personalisedAds', v)} />
                </div>
            </div>

            <div style={{ marginTop: 40 }}>
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

export default PrivacySettings;