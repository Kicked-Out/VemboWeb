// import { useForm, type SubmitHandler } from "react-hook-form";
// import { Link } from "react-router-dom";

// export default function Login() {
//     type Inputs = {
//         emailOrName: string;
//         password: string;
//     };

//     const { register, handleSubmit } = useForm<Inputs>();

//     const onSubmit: SubmitHandler<Inputs> = (data) => {
//         console.log(data);
//     };

//     return (
//         <div className="">
//             <h1>Login</h1>

//             <form onSubmit={handleSubmit(onSubmit)}>
//                 <input {...register("emailOrName", { required: true })} placeholder="Email or Name" />

//                 <input {...register("password", { required: true })} placeholder="Password" type="password" />

//                 <Link to="/forgot_password">Forgot?</Link>

//                 <input type="submit" value="Sign In" />
//             </form>

//             <p>
//                 Don't have an account yet? <Link to="/register">Register</Link>
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




import AuthButton, { PrimaryButton, SocialButton } from "../../components/ui/primary-button";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";

export default function Index() {
    type Inputs = {
        emailOrName: string;
        password: string;
    };

    const { register, handleSubmit } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data);
    };

    return (
        <div className="auth-page">
            {/* Sign Up Button - Top Right */}
            <AuthButton path="/register" title="Sign Up" />

            {/* Main Content Container */}
            <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
                {/* Login Section */}
                <div className="signup-hero">
                    {/* Welcome Text */}
                    <h1 className="signup-title">
                        <span className="text-white">Welcome back </span>
                        <span className="text-light-blue">explorer</span>
                        <span className="text-white">!</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="signup-subtitle" style={{ maxWidth: 476 }}>
                        <span className="text-white">History's calling, and the globe's spinning — hop on, </span>
                        <span className="text-light-blue">Vembo's</span>
                        <span className="text-white"> taking off!</span>
                    </p>

                    {/* Form Container */}
                    <div className="form-block">
                        {/* Login Form */}
                        <div className="form-fields">
                            {/* Email / Username */}
                            <div className="input-group">
                                <div className="input-container">
                                <div className="input-box" />
                                <input
                                    {...register("emailOrName", { required: true })}
                                    placeholder="Email or Name"
                                    className="input"
                                />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="input-group">
                                <div className="input-container">
                                    <div className="input-box" />
                                    <input
                                        {...register("password", { required: true })}
                                        placeholder="Password"
                                        type="password"
                                        className="input"
                                    />
                                    <Link to="/forgot-password" className="forgot-link">
                                        FORGOT?
                                    </Link>
                                </div>
                            </div>

                            {/* Login Button */}
                            <PrimaryButton title="LOG IN" />
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
                                <SocialButton
                                    title="GOOGLE"
                                    social="https://img.icons8.com/?size=28&id=17949&format=png&color=000000"
                                    alt="Google"
                                />
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
                        By signing in to Vembo, you agree to our Terms and Privacy Policy.
                    </p>
                    <p className="p-2lines">
                        This site is protected by reCAPTCHA Enterprise and the Google Privacy Policy and Terms of Service apply.
                    </p>
                </div>
            </form>
        </div>
    );
}
