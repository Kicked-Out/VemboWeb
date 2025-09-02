import { Route, Routes } from "react-router-dom";
import "./styles/styles.css";
// import "./styles/global.css";
import Home from "./pages/Home";
import Lesson from "./pages/Lesson";
import NotFound from "./pages/NotFound";
import NavBar from "./components/navigation/navBar";
import Registration from "./pages/auth/Registration";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "./slices/store";
import Profile from "./pages/Profile";
import { useEffect, useState } from "react";
import { initSlice } from "./slices/authSlice";
import Achievements from "./pages/Achievements";
import UserStatisticService from "./services/userStatisticService";
import type { UserDTO } from "./DTOs/auth/userDTO";
import type { UserStatisticDTO } from "./DTOs/userStatisticDTO";
import AuthService from "./services/authService";
import PasswordUpdated from "./pages/auth/PasswordUpdated";
import EmailConfirmation from "./pages/auth/EmailConfirmation";
import Sidebar from "./components/header/sidebar";

export default function App() {
    const dispatch = useDispatch<AppDispatch>();
    const [user, setUser] = useState<UserDTO>();
    const [userStatistic, setUserStatistic] = useState<UserStatisticDTO | null>();

    useEffect(() => {
        dispatch(initSlice());
    }, [dispatch]);

    useEffect(() => {
        const getUser = async () => {
            const data = await AuthService.get();

            setUser(data);
        };

        getUser();
    }, []);

    useEffect(() => {
        const getUserStatistic = async () => {
            if (!user) return;

            const data = await UserStatisticService.getByUserId(user.id);

            setUserStatistic(data);
        };

        getUserStatistic();
    }, [user]);

    return (
        <div className="grid-container">
            <NavBar />

            <div className="container">
                <Routes>
                    <Route path="*" element={<NotFound />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/lesson" element={<Lesson />}>
                        <Route path="unit/:unitId/level/:levelId" element={<Lesson />} />
                        <Route path="unit/:unitId/legendary/:legendaryId" element={<Lesson />} />
                    </Route>
                    <Route path="/profile/:nickName" element={<Profile />} />
                    <Route path="/profile/:nickName/achievements" element={<Achievements />} />
                    <Route path="/register" element={<Registration />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset_password" element={<ResetPassword />} />
                    <Route path="/password-updated/" element={<PasswordUpdated />} />
                    <Route path="/email-confirmation/" element={<EmailConfirmation />} />
                </Routes>

                {/* <Footer /> */}
            </div>

            <Sidebar />
        </div>
    );
}
