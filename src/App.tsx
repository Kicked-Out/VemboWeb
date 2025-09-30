import "./styles/styles.css";
import "./styles/global.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Lesson from "./pages/Lesson";
import NotFound from "./pages/NotFound";
import NavBar from "./components/navigation/navBar";
import Registration from "./pages/auth/Registration";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "./slices/store";
import { useEffect, useState } from "react";
import { initSlice, selectToken, setToken } from "./slices/authSlice";
import UserStatisticService from "./services/userStatisticService";
import type { UserDTO } from "./DTOs/auth/userDTO";
import type { UserStatisticDTO } from "./DTOs/userStatisticDTO";
import AuthService from "./services/authService";
import PasswordUpdated from "./pages/auth/PasswordUpdated";
import EmailConfirmation from "./pages/auth/EmailConfirmation";
import Sidebar from "./components/header/sidebar";
import Contact from "./pages/Contact";
import { selectIsNavbarHidden, selectIsSidebarHidden, selectIsWhatAreLeaderboardsCardHidden } from "./slices/menuSlice";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Terms from "./pages/Terms";
import Achievements from "./pages/Achievements";
import Leaderboards from "./pages/Leaderboards";
import Shop from "./pages/Shop";
import Quests from "./pages/Quests";
import Practice from "./pages/Practice";
import { giveVBucks, setCurrentPeriodId, setHearts, setStreak, setTotalXP } from "./slices/userStatisticsSlice";
import { getToken } from "./helpers/localStorage.helper";
import Settings from "./pages/settings/settings";
import Privacy from "./pages/settings/privacy";
import Social from "./pages/settings/social";
import Premium from "./pages/Premium";

function App() {
    const dispatch = useDispatch<AppDispatch>();
    const [user, setUser] = useState<UserDTO>();
    const [userStatistic, setUserStatistic] = useState<UserStatisticDTO | null>();
    const isNavbarHidden = useSelector(selectIsNavbarHidden);
    const isSidebarHidden = useSelector(selectIsSidebarHidden);
    const [gridTemplateFirstColumn, setGridTemplateFirstColumn] = useState("320px");
    const [gridTemplateThirdColumn, setGridTemplateThirdColumn] = useState("3fr");
    const gridTemplateColumns = `${gridTemplateFirstColumn} ${gridTemplateThirdColumn}`;
    const isWhatAreLeaderboardsCard = useSelector(selectIsWhatAreLeaderboardsCardHidden);
    const navigate = useNavigate();
    const token = useSelector(selectToken);
    const [isTokenChecked, setIsTokenChecked] = useState<boolean>(false);

    useEffect(() => {
        const handleStorage = () => {
            const newToken = getToken();
            dispatch(setToken(newToken));
            setIsTokenChecked(true);
        };

        window.addEventListener("storage", handleStorage);

        return () => window.removeEventListener("storage", handleStorage);
    }, []);

    useEffect(() => {
        const savedToken = getToken();

        if (savedToken) {
            dispatch(setToken(savedToken));
        } else {
            setIsTokenChecked(true);
        }
    }, [dispatch]);

    useEffect(() => {
        if (isNavbarHidden) {
            setGridTemplateFirstColumn("1fr");
        } else {
            setGridTemplateFirstColumn("320px 5fr");
        }

        if (isSidebarHidden) {
            setGridTemplateThirdColumn("auto");
        } else {
            setGridTemplateThirdColumn("3fr");
        }
    });

    const checkIsTokenValid = async () => {
        if (!token) return false;

        const isTokenValid = await AuthService.validateToken();

        return isTokenValid;
    };

    useEffect(() => {
        if (!isTokenChecked) return;

        const validate = async () => {
            const isTokenValid = await checkIsTokenValid();

            if (!token || !isTokenValid) {
                navigate("/login");
            }
        };

        validate();
    }, [token, isTokenChecked]);

    useEffect(() => {
        const validate = async () => {
            const isTokenValid = await checkIsTokenValid();

            if (!token || !isTokenValid) return;

            dispatch(initSlice());
        };

        validate();
    }, [token]);

    useEffect(() => {
        const getUser = async () => {
            const isTokenValid = await checkIsTokenValid();

            if (!token || !isTokenValid) return;

            const data = await AuthService.get();

            setUser(data);
        };

        getUser();
    }, [token]);

    useEffect(() => {
        const getUserStatistic = async () => {
            if (!user) return;
            const isTokenValid = await checkIsTokenValid();

            if (!token || !isTokenValid) return;

            const data = await UserStatisticService.getByUserId(user.id);

            setUserStatistic(data);
        };

        getUserStatistic();
    }, [user]);

    useEffect(() => {
        if (userStatistic) {
            dispatch(setHearts({ hearts: userStatistic.hearts }));
            dispatch(setStreak({ streak: userStatistic.streak }));
            dispatch(giveVBucks({ vBucks: userStatistic.vBucks }));
            dispatch(setTotalXP({ totalXP: userStatistic.totalXP }));
            dispatch(setCurrentPeriodId({ currentPeriodId: userStatistic.currentPeriodId }));
        }
    }, [userStatistic]);

    return (
        <div
            className="grid-container"
            style={{
                gridTemplateColumns: `${gridTemplateColumns}`,
                ["--grid-background" as any]: `${
                    !isWhatAreLeaderboardsCard && !isSidebarHidden
                        ? "linear-gradient(to bottom, transparent 75%, rgba(0, 0, 0, 0.4) 100%)"
                        : "none"
                }`,
            }}
        >
            <NavBar isHidden={isNavbarHidden} />

            <div className="container">
                <Routes>
                    <Route path="*" element={<NotFound />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/lesson" element={<Lesson />}>
                        <Route path="unit/:unitId/level/:levelId" element={<Lesson />} />
                        <Route path="unit/:unitId/legendary/:legendaryId" element={<Lesson />} />
                    </Route>
                    <Route path="/practice" element={<Lesson />} />
                    <Route path="/register" element={<Registration />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/email-confirmation" element={<EmailConfirmation />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/password-updated" element={<PasswordUpdated />} />
                    <Route path="/profile/:nickName" element={<Profile />} />
                    <Route path="/profile/:nickName/achievements" element={<Achievements />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/leaderboards" element={<Leaderboards />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/quests" element={<Quests />} />
                    <Route path="/practice-hub" element={<Practice />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/social" element={<Social />} />
                    <Route path="/get-insight" element={<Premium />} />
                </Routes>
            </div>

            <Sidebar isHidden={isSidebarHidden} />
        </div>
    );
}

export default App;
