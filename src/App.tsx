import { Route, Routes, useLocation } from "react-router-dom";
// import "./styles/styles.css";
import "./styles/global.css";
import Home from "./pages/Home";
import Lesson from "./pages/Lesson";
import NotFound from "./pages/NotFound";
import NavBar from "./components/navigation/navBar";
import Header from "./components/header/header";
import Registration from "./pages/auth/Registration";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import PasswordUpdated from "./pages/auth/PasswordUpdated";
import { Provider } from "react-redux";
import { store } from "./slices/store";
import EmailConfirmation from "./pages/auth/EmailConfirmation";
import Premium from "./pages/premium/Premium";

function App() {
    const location = useLocation();
    const isPremiumPage = location.pathname.startsWith("/premium");

    return (
        <div className={`grid-container${isPremiumPage ? " premium-grid" : ""}`}>
            {!isPremiumPage && <NavBar />}

            <div className={`container${isPremiumPage ? " premium-container" : ""}`}>
                <Provider store={store}>
                    {!isPremiumPage && <Header />}

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
                        <Route path="/email-confirmation" element={<EmailConfirmation/>}/>
                        <Route path="/reset-password" element={<ResetPassword />} />
                        <Route path="/password-updated" element={<PasswordUpdated/>} />
                        <Route path="/premium" element={<Premium />} />
                    </Routes>

                    {/* <Footer /> */}
                </Provider>
            </div>
        </div>
    );
}

export default App;
