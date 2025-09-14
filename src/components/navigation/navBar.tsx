import { useState } from "react";
import { Link } from "react-router-dom";
import { selectUserData } from "../../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import type { NavbarComponent } from "../../types/componentTypes";
import { selectSelectedPage, setPage } from "../../slices/menuSlice";

export default function NavBar({ isHidden }: NavbarComponent) {
	const dispatch = useDispatch();
	const user = useSelector(selectUserData);
	const selectedPage = useSelector(selectSelectedPage);

	const [moreOpen, setMoreOpen] = useState(false);

	const updatePage = (index: number) => {
		dispatch(setPage({ selectedPage: index }));
	};

	const openMore = () => setMoreOpen(true);
	const closeMore = () => setMoreOpen(false);
	const handleLogout = () => {
		console.log("Log out clicked");
	};

	return (
		<nav className={`navbar ${isHidden ? "hidden" : ""}`}>
			<Link to="/" className="nav-title">
				Vembo
			</Link>
			<Link
				to="/"
				className={`nav-btn ${selectedPage === 0 ? "nav-btn-selected" : ""}`}
				onClick={() => updatePage(0)}
			>
				<img className="nav-icon" src="/src/assets/icons/glacier.png" />
				Learn
			</Link>
			<Link
				to="/practice"
				className={`nav-btn ${selectedPage === 1 ? "nav-btn-selected" : ""}`}
				onClick={() => updatePage(1)}
			>
				<img className="nav-icon" src="/src/assets/icons/practice.png" />
				Practice
			</Link>
			<Link
				to="/leaderboards"
				className={`nav-btn ${selectedPage === 2 ? "nav-btn-selected" : ""}`}
				onClick={() => updatePage(2)}
			>
				<img className="nav-icon" src="/src/assets/icons/leaderboards.png" />
				Leaderboards
			</Link>
			<Link
				to="/quests"
				className={`nav-btn ${selectedPage === 3 ? "nav-btn-selected" : ""}`}
				onClick={() => updatePage(3)}
			>
				<img className="nav-icon" src="/src/assets/icons/chest.png" />
				Quests
			</Link>
			<Link
				to="/shop"
				className={`nav-btn ${selectedPage === 4 ? "nav-btn-selected" : ""}`}
				onClick={() => updatePage(4)}
			>
				<img className="nav-icon" src="/src/assets/icons/shop.png" />
				Shop
			</Link>
			<Link
				to={`/profile/${user?.nickNameSlug}`}
				className={`nav-btn ${selectedPage === 5 ? "nav-btn-selected" : ""}`}
				onClick={() => updatePage(5)}
			>
				<img className="nav-icon" src="/src/assets/icons/profile_default_icon.png" />
				Profile
			</Link>

			<div
				className="nav-btn more-container"
				onMouseEnter={openMore}
				onMouseLeave={closeMore}
			>
				<div className="more-toggle">
					<img className="nav-icon" src="/src/assets/icons/more.png" />
					<span>More</span>
				</div>

				<div
					className={`more-menu ${moreOpen ? "more-menu-open" : "more-menu-closed"}`}
					role="menu"
					aria-hidden={!moreOpen}
				>
					<Link to="/settings" className="more-menu-item" onClick={closeMore}>
						Settings
					</Link>

					<button
						type="button"
						className="more-menu-item"
						onClick={() => {
							handleLogout();
							closeMore();
						}}
					>
						Log out
					</button>

					<Link to="/help" className="more-menu-item" onClick={closeMore}>
						Help
					</Link>
				</div>
			</div>
		</nav>
	);
}