import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import insightIcon from "../assets/icons/insight/insight_icon.svg";
import bearImg from "../assets/icons/bear.svg";
import heartIcon from "../assets/icons/heart.svg";
import unlimitedHeartIcon from "../assets/icons/heart_infinite.svg";
import coinIcon from "../assets/icons/vembo_coin.svg";
import { selectVBucks, setHearts, takeVBucks } from "../slices/userStatisticsSlice";
import "../styles/shop.css";
import { useEffect } from "react";
import {
    hideInsightCard,
    hideMonthlyBadgesCard,
    hideWhatAreLeaderboardsCard,
    showAdBlockerCard,
    showDailyQuestCard,
    showInfoCard,
    showLeaderboardCard,
    showNavbar,
    showSidebar,
    showStatisticCard,
} from "../slices/menuSlice";

export default function Shop() {
    const vBucks = useSelector(selectVBucks);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(showNavbar());
        dispatch(showSidebar());
        dispatch(showStatisticCard());
        dispatch(hideInsightCard());
        dispatch(showLeaderboardCard());
        dispatch(showDailyQuestCard());
        dispatch(showAdBlockerCard());
        dispatch(hideWhatAreLeaderboardsCard());
        dispatch(hideMonthlyBadgesCard());
        dispatch(showInfoCard());
    }, []);

    const heartsPrice = 350;
    const hasEnough = vBucks >= heartsPrice;

    const refillHearts = () => {
        if (!hasEnough) return;
        dispatch(setHearts({ hearts: 5 }));
        dispatch(takeVBucks({ vBucks: heartsPrice }));
    };

    const goToInsight = () => {
        navigate("/get-insight");
    };

    return (
        <div className="shop-page">
            <div className="big-insight-card">
                <img src="/src/assets/icons/insight/insight_icon.png" alt="Insight" className="insight-tag" />
                <h2>Not Just History...</h2>
                <p>The hidden history. Unlock it with Premium</p>
                <button className="unlock-btn" onClick={goToInsight}>
                    Unlock
                </button>
                <img src="/src/assets/icons/shop/vembo-insight-card2.png" alt="Bear" className="bear" />
            </div>

            <div className="offers-container">
                <h3>Hearts</h3>

                <div className="offer-item">
                    <div className="offer-info">
                        <img src="/src/assets/icons/shop/heart.png" alt="Refill Hearts" className="icon" />
                        <div className="offer-text">
                            <p>Refill Hearts</p>
                            <p>Get fully hearts so you can worry less about making mistakes in lesson</p>
                        </div>
                    </div>
                    <button className="offer-btn" disabled={!hasEnough} onClick={refillHearts}>
                        <img src={coinIcon} alt="" className="coin-icon" />
                        GET FOR: {heartsPrice}
                    </button>
                </div>

                <div className="offers-divider"></div>

                <div className="offer-item">
                    <div className="offer-info">
                        <img src="/src/assets/icons/shop/insight-heart.png" alt="Unlimited Hearts" className="icon" />
                        <div className="offer-text">
                            <p>Unlimited Hearts</p>
                            <p>Never run out of hearts with Insight!</p>
                        </div>
                    </div>
                    <button className="offer-btn" onClick={goToInsight}>
                        Try it
                    </button>
                </div>
            </div>
        </div>
    );
}
