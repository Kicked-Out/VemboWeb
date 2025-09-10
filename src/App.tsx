import { Route, Routes } from "react-router-dom";
import "./styles/styles.css";
import "./styles/global.css";
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
import { initSlice } from "./slices/authSlice";
import UserStatisticService from "./services/userStatisticService";
import type { UserDTO } from "./DTOs/auth/userDTO";
import type { UserStatisticDTO } from "./DTOs/userStatisticDTO";
import AuthService from "./services/authService";
import PasswordUpdated from "./pages/auth/PasswordUpdated";
import EmailConfirmation from "./pages/auth/EmailConfirmation";
import Shop from "./pages/Shop";
import Sidebar from "./components/header/sidebar";
import Contact from "./pages/Contact";
import { selectIsNavbarHidden, selectIsSidebarHidden } from "./slices/menuSlice";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Terms from "./pages/Terms";
import Achievements from "./pages/Achievements";

function App() {
    const dispatch = useDispatch<AppDispatch>();
    const [user, setUser] = useState<UserDTO>();
    const [userStatistic, setUserStatistic] = useState<UserStatisticDTO | null>();
    const isNavbarHidden = useSelector(selectIsNavbarHidden);
    const isSidebarHidden = useSelector(selectIsSidebarHidden);
    const [gridTemplateFirstColumn, setGridTemplateFirstColumn] = useState("320px");
    const [gridTemplateThirdColumn, setGridTemplateThirdColumn] = useState("3fr");
    const gridTemplateColumns = `${gridTemplateFirstColumn} ${gridTemplateThirdColumn}`;

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
        <div className="grid-container" style={{ gridTemplateColumns: `${gridTemplateColumns}` }}>
            <NavBar isHidden={isNavbarHidden} />

            <div className="container">
                <Routes>
                    <Route path="*" element={<NotFound />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/lesson" element={<Lesson />}>
                        <Route path="unit/:unitId/level/:levelId" element={<Lesson />} />
                        <Route path="unit/:unitId/legendary/:legendaryId" element={<Lesson />} />
                    </Route>
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
                </Routes>
            </div>

            <Sidebar isHidden={isSidebarHidden} />
        </div>
    );
}

export default App;
