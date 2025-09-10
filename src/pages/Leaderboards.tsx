import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    hideAdBlockerCard,
    hideDailyQuestCard,
    hideInfoCard,
    hideInsightCard,
    hideLeaderboardCard,
    hideSidebar,
    hideStatisticCard,
    selectFirstLevelStatus,
    showWhatAreLeaderboardsCard,
} from "../slices/menuSlice";
import { useNavigate } from "react-router-dom";

export default function Leaderboards() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isFirstLevelStatus = useSelector(selectFirstLevelStatus);

    useEffect(() => {
        if (isFirstLevelStatus === 1) {
            dispatch(hideStatisticCard());
            dispatch(hideInsightCard());
            dispatch(hideLeaderboardCard());
            dispatch(hideDailyQuestCard());
            dispatch(hideAdBlockerCard());
            dispatch(showWhatAreLeaderboardsCard());
            dispatch(hideInfoCard());
        } else {
            dispatch(hideSidebar());
        }
    }, [isFirstLevelStatus]);

    const onClickHandler = () => {
        navigate("/practice");
    };

    return isFirstLevelStatus === 1 ? (
        <div className="locked-leaderboards">
            <div className="locked-leaderboards-title-block">
                <img className="locked-leaderboards-img" src="/src/assets/icons/leaderboards/locked/title-img.png" />

                <h2 className="locked-leaderboards-title">Unlock Leaderboards</h2>
                <p className="locked-leaderboards-description">Complete lessons to start competing</p>

                <button className="locked-leaderboards-btn" onClick={onClickHandler}>
                    Start a lesson
                </button>
            </div>

            <div className="leaderboards-user-skeletons">
                <div
                    className="leaderboards-user-skeleton"
                    style={{ ["--skeleton-background-color" as any]: `#5C6B76` }}
                >
                    <div className="user-skeleton-info">
                        <div className="user-skeleton-top"></div>
                        <img
                            className="user-skeleton-avatar"
                            src="/src/assets/icons/leaderboards/locked/users/user1.png"
                        />
                        <div className="user-skeleton-nickname" style={{ width: "66px" }}></div>
                    </div>

                    <div className="user-skeleton-totalxp"></div>
                </div>

                <div
                    className="leaderboards-user-skeleton"
                    style={{ ["--skeleton-background-color" as any]: `#4C5963` }}
                >
                    <div className="user-skeleton-info">
                        <div className="user-skeleton-top"></div>
                        <img
                            className="user-skeleton-avatar"
                            src="/src/assets/icons/leaderboards/locked/users/user2.png"
                        />

                        <div className="user-skeleton-nickname" style={{ width: "105px" }}></div>
                    </div>

                    <div className="user-skeleton-totalxp"></div>
                </div>

                <div
                    className="leaderboards-user-skeleton"
                    style={{ ["--skeleton-background-color" as any]: `#444F58` }}
                >
                    <div className="user-skeleton-info">
                        <div className="user-skeleton-top"></div>
                        <img
                            className="user-skeleton-avatar"
                            src="/src/assets/icons/leaderboards/locked/users/user3.png"
                        />
                        <div className="user-skeleton-nickname" style={{ width: "40px" }}></div>
                    </div>

                    <div className="user-skeleton-totalxp"></div>
                </div>

                <div
                    className="leaderboards-user-skeleton"
                    style={{ ["--skeleton-background-color" as any]: `#3B434A` }}
                >
                    <div className="user-skeleton-info">
                        <div className="user-skeleton-top"></div>
                        <img
                            className="user-skeleton-avatar"
                            src="/src/assets/icons/leaderboards/locked/users/user4.png"
                        />
                        <div className="user-skeleton-nickname" style={{ width: "135px" }}></div>
                    </div>

                    <div className="user-skeleton-totalxp"></div>
                </div>

                <div
                    className="leaderboards-user-skeleton"
                    style={{ ["--skeleton-background-color" as any]: `#2A3136` }}
                >
                    <div className="user-skeleton-info">
                        <div className="user-skeleton-top"></div>
                        <img
                            className="user-skeleton-avatar"
                            src="/src/assets/icons/leaderboards/locked/users/user5.png"
                        />
                        <div className="user-skeleton-nickname" style={{ width: "55px" }}></div>
                    </div>

                    <div className="user-skeleton-totalxp"></div>
                </div>
            </div>
        </div>
    ) : (
        <div className="leaderboards">
            <div className="leagues-container">
                <div className="leagues-block">
                    <img className="current-league" src="/src/assets/icons/leaderboards/leagues/ice_league.png" />
                    <img className="blocked-league" src="/src/assets/icons/leaderboards/leagues/locked_league.png" />
                    <img className="blocked-league" src="/src/assets/icons/leaderboards/leagues/locked_league.png" />
                    <img className="blocked-league" src="/src/assets/icons/leaderboards/leagues/locked_league.png" />
                    <img className="blocked-league" src="/src/assets/icons/leaderboards/leagues/locked_league.png" />
                    <img className="blocked-league" src="/src/assets/icons/leaderboards/leagues/locked_league.png" />
                </div>

                <div className="current-league-block">
                    <h1 className="current-league-title">Ice League</h1>
                    <h2 className="current-league-description">Top 8 advance to the next league</h2>
                    <h3 className="next-league-time-remaning">1 day</h3>
                </div>
            </div>

            <div className="users-block"></div>
        </div>
    );
}
