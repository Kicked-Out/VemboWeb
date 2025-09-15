import { Route, Routes } from "react-router-dom";
// import "./styles/styles.css";
import "./styles/global.css";
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
import PasswordUpdated from "./pages/auth/PasswordUpdated";
import { Provider } from "react-redux";
import { store } from "./slices/store";
import EmailConfirmation from "./pages/auth/EmailConfirmation";

function App() {
    return (
        <div className="grid-container">
            <NavBar />

            <div className="container">
                <Provider store={store}>
                    <Header />

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
                    </Routes>

                    {/* <Footer /> */}
                </Provider>
            </div>
        </div>
    );
}

export default App;