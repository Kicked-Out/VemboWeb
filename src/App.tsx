import { Route, Routes } from "react-router-dom";
import "./styles/styles.css";
import Home from "./pages/Home";
import Lesson from "./pages/Lesson";
import NotFound from "./pages/NotFound";
import NavBar from "./components/navigation/navBar";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Registration from "./pages/Registration";

function App() {
    return (
        <div className="flex">
            <NavBar />

            <div className="content">
                <Header />

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/lesson" element={<Lesson />} />
                    <Route path="/registration" element={<Registration />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>

                <Footer />
            </div>
        </div>
    );
}

export default App;
