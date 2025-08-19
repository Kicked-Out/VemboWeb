import { Route, Routes } from "react-router-dom";
import "./styles/styles.css";
import Home from "./pages/Home";
import Lesson from "./pages/Lesson";
import NotFound from "./pages/NotFound";
import NavBar from "./components/navigation/navBar";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Registration from "./pages/auth/Registration";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "./slices/store";
import Profile from "./pages/Profile";
import { useEffect } from "react";
import { initSlice } from "./slices/authSlice";
import Achievements from "./pages/Achievements";

export default function App() {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(initSlice());
    }, [dispatch]);

    return (
        <div className="grid-container">
            <NavBar />

            <div className="container">
                <Header />

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
                    <Route path="/forgot_password" element={<ForgotPassword />} />
                    <Route path="/reset_password" element={<ResetPassword />} />
                </Routes>

                {/* <Footer /> */}
            </div>
        </div>
    );
}
