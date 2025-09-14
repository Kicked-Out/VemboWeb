import { useNavigate } from "react-router-dom";

export default function LockedMonthlyBadgesCard() {
    const navigate = useNavigate();

    const onClickHandler = () => {
        navigate("/practice");
    };

    return (
        <div className="locked-monthly-badges-card">
            <h2 className="locked-monthly-badges-card__title">Monthly challenges unlock soon!</h2>

            <p className="locked-monthly-badges-card__description">
                Complete each month's challenge to earn exclusive badges
            </p>

            <img
                className="locked-monthly-badges-card__img"
                src="/src/assets/icons/quests/locked/locked_monthly_badges_card_img.png"
            />

            <button className="locked-monthly-badges-btn" onClick={onClickHandler}>
                Start a lesson
            </button>
        </div>
    );
}
