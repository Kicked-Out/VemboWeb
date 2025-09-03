import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { hideNavbar, hideSidebar } from "../slices/menuSlice";

export default function NotFound() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(hideNavbar());
        dispatch(hideSidebar());
    });

    return (
        <div>
            <h1>404 Not Found</h1>
            <p>The page you are looking for does not exist.</p>
        </div>
    );
}
