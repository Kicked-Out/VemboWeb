import { useNavigate } from "react-router-dom";

export default function LockedLeaderboards() {
    const navigate = useNavigate();

    const onClickHandler = () => {
        navigate("/practice");
    };

    return (
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
    );
}
