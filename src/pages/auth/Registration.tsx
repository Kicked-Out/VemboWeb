// import { useForm, type SubmitHandler } from "react-hook-form";
// import { Link } from "react-router-dom";

// export default function Registration() {
//     type Inputs = {
//         name: string;
//         email: string;
//         password: string;
//         confirmPassword: string;
//     };

//     const {
//         register,
//         handleSubmit,
//         watch,
//         formState: { errors },
//     } = useForm<Inputs>();

//     const onSubmit: SubmitHandler<Inputs> = (data) => {
//         console.log(data);
//     };

//     const password = watch("password");

//     return (
//         <div>
//             <h1>Profile Creating</h1>

//             <form onSubmit={handleSubmit(onSubmit)}>
//                 <input {...register("name", { required: false })} placeholder="Name (Optional)" />

//                 <input {...register("email", { required: true })} placeholder="Email" type="email" />

//                 <input
//                     {...register("password", {
//                         required: true,
//                         minLength: { value: 8, message: "Password must be at least 8 characters" },
//                     })}
//                     placeholder="Password"
//                     type="password"
//                 />

//                 {errors.password && <p>{errors.password.message}</p>}

//                 <input
//                     {...register("confirmPassword", {
//                         required: true,
//                         validate: (value: string) => value === password || "Passwords do not match",
//                     })}
//                     placeholder="Confirm Password"
//                     type="password"
//                 />

//                 {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

//                 <input type="submit" value={"Create Profile"} />
//             </form>

//             <p>
//                 Already have an account? <Link to="/login">Sign In</Link>
//             </p>

//             <div>
//                 <hr />
//                 Or
//                 <hr />
//             </div>

//             <div>
//                 <div>
//                     <div>Google</div>

//                     <div>Facebook</div>
//                 </div>

//                 <div>
//                     <div>Apple</div>
//                 </div>
//             </div>
//         </div>
//     );
// }




import AuthButton, { PrimaryButton, ShowPasswordButton, SocialButton } from "../../components/ui/primary-button";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    type Inputs = {
        name: string;
        email: string;
        password: string;
        confirmPassword: string;
    };

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data);
        navigate("/");
    };

    const password = watch("password");

    return (
        <div className="auth-page">
            {/* Log In Button - Top Right */}
            <AuthButton path="/login" title="Log in" />

            {/* Main Content Container */}
            <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
                {/* Sign Up Section */}
                <div className="signup-hero">
                    {/* Welcome Text */}
                    <h1 className="signup-title">
                        <span className="text-white">Ready to </span>
                        <span className="text-light-blue">roam</span>
                        <span className="text-white">?</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="signup-subtitle">
                        <span className="text-white">Create your passport to the past and future — </span>
                        <span className="text-light-blue">Vembo</span>
                        <span className="text-white"> will be your guide!</span>
                    </p>

                    {/* Form Container */}
                    <div className="form-block">
                        {/* Sign Up Form */}
                        <div className="form-fields">
                            {/* Name Input */}
                            <div className="input-group">
                                <div className="input-container">
                                    <div className="input-box" />
                                    <input
                                        {...register("name", { required: true })}
                                        placeholder="Name"
                                        className="input"
                                    />
                                </div>
                            </div>

                            {/* Email Input */}
                            <div className="input-group">
                                <div className="input-container">
                                    <div className="input-box" />
                                    <input
                                        {...register("email", { required: true })}
                                        placeholder="Email"
                                        type="email"
                                        className="input"
                                    />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div className="input-group">
                                <div className="input-container">
                                    <div className="input-box" />
                                    <input
                                        {...register("password", {
                                        required: true,
                                        minLength: { value: 8, message: "Password must be at least 8 characters" }, })}
                                        placeholder="Password"
                                        type={showPassword ? "text" : "password"}
                                        className="input input--with-toggle"
                                    />
                                    <div className="password-toggle">
                                        <ShowPasswordButton onClick={() => setShowPassword(!showPassword)} />
                                    </div>
                                </div>
                            </div>

                            {/* Confirm Password Input */}
                            <div className="input-group">
                                <div className="input-container">
                                    <div className="input-box" />
                                    <input
                                        {...register("confirmPassword", {
                                        required: true,
                                        validate: (value: string) => value === password || "Passwords do not match", })}
                                        placeholder="Confirm Password"
                                        type={showConfirmPassword ? "text" : "password"}
                                        className="input input--with-toggle"
                                    />
                                    <div className="password-toggle">
                                        <ShowPasswordButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
                                    </div>
                                </div>
                            </div>

                            {/* Create Account Button */}
                            <PrimaryButton title="CREATE ACCOUNT" />
                            </div>

                            {/* Social Login Section */}
                            <div className="form-block">
                            {/* OR Divider */}
                            <div className="or">
                                <div className="or-line" />
                                <div className="or-text">OR</div>
                                <div className="or-line" />
                            </div>

                            {/* Social Login Buttons */}
                            <div className="social-row">
                                {/* Google Button */}
                                <SocialButton
                                    title="GOOGLE"
                                    social="https://img.icons8.com/?size=28&id=17949&format=png&color=000000"
                                    alt="Google"
                                />

                                {/* Facebook Button */}
                                <SocialButton
                                    title="FACEBOOK"
                                    social="https://img.icons8.com/?size=28&id=118467&format=png&color=1768D2"
                                    alt="Facebook"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Terms and Policy */}
                <div className="terms">
                    <p className="p-1line">
                        By signing up to Vembo, you agree to our Terms and Privacy Policy.
                    </p>
                    <p className="p-2lines">
                        This site is protected by reCAPTCHA Enterprise and the Google Privacy Policy and Terms of Service apply.
                    </p>
                </div>
            </form>
        </div>
    );
}