import React from "react";

export default function About() {
    return (
        <div className="about-page">
            <h1 className="about-title">About us</h1>
            <div className="about-divider" />
            <div className="about-grid">
                <div className="about-column">
                    <div className="about-row">
                        <h2 className="about-subtitle">Personalized education.</h2>
                        <p className="about-description">
                            Everyone learns in different ways. For the first time in history, we can analyze how millions of people learn at once to create the most effective educational system possible and tailor it to each student. Our ultimate goal is to give everyone access to a private tutor experience through technology.
                        </p>
                    </div>
                    <div className="about-row">
                        <h2 className="about-subtitle">Making learning fun.</h2>
                        <p className="about-description">
                            It's hard to stay motivated when learning online, so we made Vembo so fun, some people would prefer picking up new skills over playing a game.
                        </p>
                    </div>
                </div>
                <div className="about-column">
                    <div className="about-row">
                        <h2 className="about-subtitle">Universally accessible.</h2>
                        <p className="about-description">
                            We created Vembo so that everyone could have a chance to learn history. Free education – no hidden fees, no premium content, just free. Vembo is used by the richest man in the world and many Hollywood stars, and at the same time by public school students in developing countries. We believe true equality is when spending more can't buy you a better education.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
