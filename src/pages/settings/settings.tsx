import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import VemboButton from "../../components/settings/vembo-button";
import VemboInput from "../../components/settings/vembo-input";
import "../../styles/settings/profile.css";
import "../../styles/settings/layout.css";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUserData, setUser } from "../../slices/authSlice";
import { UserService } from "../../services/userService";
import type { UserDTO } from "../../DTOs/auth/userDTO";

const Index = () => {
    useEffect(() => {
        document.body.classList.add("hide-sidebar", "settings-page");
        return () => {
            document.body.classList.remove("hide-sidebar", "settings-page");
        };
    }, []);

    const dispatch = useDispatch();
    const user = useSelector(selectUserData);

    type Input = {
        avatar: FileList;
        userName: string;
        nickName: string;
        email: string;
        currentPassword: string;
        newPassword: string;
    };

    const { register, handleSubmit, watch, reset } = useForm<Input>({
        defaultValues: {
            userName: user?.userName,
            nickName: user?.nickName,
            email: user?.email,
            currentPassword: "",
            newPassword: "",
        },
    });

    useEffect(() => {
        if (user) {
            reset({
                userName: user.userName,
                nickName: user.nickName,
                email: user.email,
                currentPassword: "",
                newPassword: "",
                avatar: undefined as any,
            });
        }
    }, [user, reset]);

    const onSubmit: SubmitHandler<Input> = async (data) => {
        const formData = new FormData();

        if (data.avatar && data.avatar.length !== 0) {
            formData.append("Avatar", data.avatar[0]);
        }
        formData.append("UserName", data.userName);
        formData.append("NickName", data.nickName);
        formData.append("NickNameSlug", data.nickName.toLowerCase().replace(" ", "-"));
        formData.append("Password", "141203_Gd");
        formData.append("Email", data.email);

        const response = await UserService.update(formData);

        if (response) {
            const updatedUser: UserDTO = {
                id: user!.id,
                avatarUrl: avatar && avatar.length !== 0 ? URL.createObjectURL(data.avatar[0]) : user!.avatarUrl,
                userName: data.userName,
                nickName: data.nickName,
                nickNameSlug: data.nickName.toLowerCase().replace(" ", "-"),
                email: data.email,
                isPremium: user!.isPremium,
                premiumStartedAt: user!.premiumStartedAt,
                premiumExpiresAt: user!.premiumExpiresAt,
                createdAt: user!.createdAt,
                nativeLanguage: user!.nativeLanguage,
                selectedRegion: user!.selectedRegion,
            };

            console.log(updatedUser);

            dispatch(setUser(updatedUser));
        }
    };

    const avatar = watch("avatar");

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const handleDeleteAccount = async () => {
        dispatch(logout());

        await UserService.delete(user!.id);
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    const EyeIcon = () => (
        <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ color: "var(--glacier-blue)", cursor: "pointer" }}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11 16C11 14.6739 11.5268 13.4021 12.4645 12.4645C13.4021 11.5268 14.6739 11 16 11C17.3261 11 18.5979 11.5268 19.5355 12.4645C20.4732 13.4021 21 14.6739 21 16C21 17.3261 20.4732 18.5979 19.5355 19.5355C18.5979 20.4732 17.3261 21 16 21C14.6739 21 13.4021 20.4732 12.4645 19.5355C11.5268 18.5979 11 17.3261 11 16ZM16 13C15.2044 13 14.4413 13.3161 13.8787 13.8787C13.3161 14.4413 13 15.2044 13 16C13 16.7956 13.3161 17.5587 13.8787 18.1213C14.4413 18.6839 15.2044 19 16 19C16.7956 19 17.5587 18.6839 18.1213 18.1213C18.6839 17.5587 19 16.7956 19 16C19 15.2044 18.6839 14.4413 18.1213 13.8787C17.5587 13.3161 16.7956 13 16 13Z"
                fill="currentColor"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.764 14.1947C5.20533 15 5 15.6307 5 16C5 16.3693 5.20533 17 5.764 17.8053C6.30533 18.5827 7.108 19.4267 8.124 20.2067C10.16 21.7693 12.9507 23 16 23C19.0493 23 21.84 21.7693 23.876 20.2067C24.892 19.4267 25.6947 18.5827 26.236 17.8053C26.7947 17 27 16.3693 27 16C27 15.6307 26.7947 15 26.236 14.1947C25.6947 13.4173 24.892 12.5733 23.876 11.7933C21.84 10.2307 19.0493 9 16 9C12.9507 9 10.16 10.2307 8.124 11.7933C7.108 12.5733 6.30533 13.4173 5.764 14.1947ZM6.90533 10.2067C9.21333 8.436 12.4213 7 16 7C19.5787 7 22.7867 8.436 25.0933 10.2067C26.2493 11.0933 27.204 12.0827 27.8787 13.0547C28.5347 14 29 15.036 29 16C29 16.964 28.5333 18 27.8787 18.9453C27.204 19.9173 26.2493 20.9053 25.0947 21.7933C22.788 23.564 19.5787 25 16 25C12.4213 25 9.21333 23.564 6.90667 21.7933C5.75067 20.9067 4.796 19.9173 4.12133 18.9453C3.46667 18 3 16.964 3 16C3 15.036 3.46667 14 4.12133 13.0547C4.796 12.0827 5.75067 11.0947 6.90533 10.2067Z"
                fill="currentColor"
            />
        </svg>
    );

    const location = useLocation();

    return (
        <div className="profile-page">
            <div className="content">
                <div className="page-container">
                    <h1 className="page-title">Profile</h1>

                    <form
                        method="post"
                        action="post"
                        encType="multipart/form-data"
                        className="section"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <h2 className="section-title">Avatar</h2>

                        <div className="avatar-block">
                            <label className="avatar-label" htmlFor="avatar">
                                <img
                                    className="avatar-label-img"
                                    src="/src/assets/icons/settings/profile/change_avatar_img_icon.png"
                                />
                            </label>

                            <input
                                {...register("avatar")}
                                className="avatar-input"
                                type="file"
                                accept="image/*"
                                name="avatar"
                                id="avatar"
                            />

                            <img
                                className="avatar-viewer"
                                src={
                                    avatar && avatar.length
                                        ? URL.createObjectURL(avatar[0])
                                        : user && user.avatarUrl
                                        ? user?.avatarUrl
                                        : ""
                                }
                            />
                        </div>

                        <div className="form-fields">
                            <VemboInput
                                label="Username"
                                defaultValue={user?.userName}
                                placeholder="Enter your name"
                                {...register("userName")}
                            />
                            <VemboInput
                                label="Nickname"
                                defaultValue={user?.nickName}
                                placeholder="Enter your username"
                                {...register("nickName")}
                            />

                            <div className="section">
                                <VemboInput
                                    label="E-mail"
                                    type="email"
                                    defaultValue={user?.email}
                                    placeholder="Enter your email"
                                    {...register("email")}
                                />
                                {/* <p className="subtitle">E-mail not verified. Verify now</p> */}
                            </div>

                            <VemboInput
                                label="Current password"
                                type={showCurrentPassword ? "text" : "password"}
                                placeholder="Enter current password"
                                icon={
                                    <div onClick={() => setShowCurrentPassword(!showCurrentPassword)}>
                                        <EyeIcon />
                                    </div>
                                }
                                {...register("currentPassword")}
                            />

                            <VemboInput
                                label="New password"
                                type={showNewPassword ? "text" : "password"}
                                placeholder="Enter new password"
                                icon={
                                    <div onClick={() => setShowNewPassword(!showNewPassword)}>
                                        <EyeIcon />
                                    </div>
                                }
                                {...register("newPassword")}
                            />
                        </div>

                        <div className="actions">
                            <VemboButton variant="primary" className="w-49">
                                Save Changes
                            </VemboButton>
                            <a href="#" onClick={handleDeleteAccount} className="delete-link">
                                Delete My Account
                            </a>
                        </div>
                    </form>
                </div>
            </div>

            <div className="sidebar-right" aria-label="Settings sidebar">
                <div className="settings-card">
                    <Link
                        to="/settings"
                        className={`settings-link ${location.pathname === "/settings" ? "active" : ""}`}
                    >
                        Profile
                    </Link>
                    <Link
                        to="/privacy"
                        className={`settings-link ${location.pathname.startsWith("/privacy") ? "active" : ""}`}
                    >
                        Privacy settings
                    </Link>
                    <Link to="/social" className={`settings-link ${location.pathname === "/social" ? "active" : ""}`}>
                        Social accounts
                    </Link>
                </div>

                <div>
                    <button className="logout-btn" onClick={handleLogout}>
                        <span>Log out</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Index;
