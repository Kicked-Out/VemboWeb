import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
    hideMonthlyBadgesCard,
    hideWhatAreLeaderboardsCard,
    showAdBlockerCard,
    showDailyQuestCard,
    showInfoCard,
    showInsightCard,
    showLeaderboardCard,
    showNavbar,
    showSidebar,
    showStatisticCard,
} from "../slices/menuSlice";

export default function Practice() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(showNavbar());
        dispatch(showSidebar());

        dispatch(showStatisticCard());
        dispatch(showInsightCard());
        dispatch(showLeaderboardCard());
        dispatch(showDailyQuestCard());
        dispatch(showAdBlockerCard());

        dispatch(hideMonthlyBadgesCard());
        dispatch(hideWhatAreLeaderboardsCard());
        dispatch(showInfoCard());
    }, []);

    return (
        <div className="practice-container">
            <div className="practice-cards-block-container">
                <div className="practice-cards-block">
                    <h2 className="practice-cards-block__title">Today's Rewind</h2>

                    <div className="practice-cards">
                        <div className="practice-insight-card">
                            <img
                                className="practice-insight-card__icon"
                                src="/src/assets/icons/practice/cards/insight_card/insight_icon.png"
                            />

                            <h2 className="practice-insight-card__title">Take The First Step</h2>

                            <h4 className="practice-insight-card__description">
                                Begin this unit to test yourself and uncover learning gaps!
                            </h4>

                            <img
                                className="practice-insight-card__img"
                                src="/src/assets/icons/practice/cards/insight_card/vembo_img.png"
                            />

                            <button className="practice-insight-card__btn">Unlock</button>
                        </div>
                    </div>
                </div>

                <div className="practice-cards-block">
                    <h2 className="practice-cards-block__title">Podcast</h2>

                    <div className="practice-cards">
                        <div className="practice-card">
                            <div className="practice-card__info">
                                <h3 className="practice-card__title">Read</h3>
                                <h4 className="practice-card__description">
                                    Uncover the past with easy-to-follow transcripts
                                </h4>
                            </div>

                            <img
                                className="practice-card__img"
                                src="/src/assets/icons/practice/cards/read_card_img.png"
                            />
                        </div>

                        <div className="practice-card">
                            <div className="practice-card__info">
                                <h3 className="practice-card__title">Listen</h3>
                                <h4 className="practice-card__description">Hear history come alive in every episode</h4>
                            </div>

                            <img
                                className="practice-card__img"
                                src="/src/assets/icons/practice/cards/listen_card_img.png"
                            />
                        </div>
                    </div>
                </div>

                <div className="practice-cards-block">
                    <h2 className="practice-cards-block__title">Your Collections</h2>

                    <div className="practice-cards">
                        <div className="practice-card">
                            <div className="practice-card__info">
                                <h3 className="practice-card__title">Mistakes</h3>
                                <h4 className="practice-card__description">
                                    Personalized review to help you overcome mistakes
                                </h4>
                            </div>

                            <img
                                className="practice-card__img"
                                src="/src/assets/icons/practice/cards/mistakes_card_img.png"
                            />
                        </div>

                        <div className="practice-card">
                            <div className="practice-card__info">
                                <h3 className="practice-card__title">Years</h3>
                                <h4 className="practice-card__description">
                                    Master tricky dates and strngthen your history skills
                                </h4>
                            </div>

                            <img
                                className="practice-card__img"
                                src="/src/assets/icons/practice/cards/years_card_img.png"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
