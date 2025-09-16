import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
    hideNavbar,
    hideSidebar,
    showNavbar,
    showSidebar,
} from "../slices/menuSlice";
import "../styles/premium.css";

type FeatureRow = {
    label: string;
    free: boolean;
    insight: boolean;
};

type PlanOption = {
    id: string;
    term: string;
    pricePerMonth: string;
    billedToday: string;
    displayName: string;
    summary: string;
    benefits: string[];
};

type PaymentForm = {
    cardholderName: string;
    cardNumber: string;
    expirationDate: string;
    securityCode: string;
};

const featureRows: FeatureRow[] = [
    { label: "Learning content", free: true, insight: true },
    { label: "Unlimited Hearts", free: false, insight: true },
    { label: "Skills practice", free: true, insight: true },
    { label: "Mistakes review", free: false, insight: true },
    { label: "Free challenge entry", free: false, insight: true },
    { label: "No ads", free: false, insight: true },
];

const planOptions: PlanOption[] = [
    {
        id: "1-month",
        term: "1 month",
        pricePerMonth: "$12.99 USD / MO",
        billedToday: "$12.99 USD today",
        displayName: "1 month plan",
        summary: "Perfect for history buffs exploring premium on a monthly rhythm.",
        benefits: [
            "Unlimited hearts to keep your streak safe",
            "Instant practice for any lesson",
            "Ad-free lessons for total focus",
        ],
    },
    {
        id: "12-month",
        term: "12 month",
        pricePerMonth: "$6.99 USD / MO",
        billedToday: "$83.99 USD today",
        displayName: "12 month plan",
        summary: "Best value — unlock insight all year with the lowest monthly price.",
        benefits: [
            "Unlimited hearts to keep your streak safe",
            "Exclusive practice sessions and review",
            "Ad-free lessons with premium insights",
        ],
    },
];

const CheckIcon = () => (
    <svg
        className="premium-check-icon"
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <circle cx="18" cy="18" r="18" fill="rgba(143, 251, 215, 0.24)" />
        <path
            d="M14.2 20.66L10.9 17.36L9.5 18.76L14.2 23.46L26.5 11.16L25.1 9.76L14.2 20.66Z"
            fill="#FFFFFF"
        />
    </svg>
);

const DashIcon = () => (
    <svg
        className="premium-dash-icon"
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <circle cx="18" cy="18" r="18" fill="rgba(255, 255, 255, 0.15)" />
        <rect x="10" y="16.5" width="16" height="3" rx="1.5" fill="rgba(255, 255, 255, 0.75)" />
    </svg>
);

const Premium = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedPlanId, setSelectedPlanId] = useState<string>("12-month");
    const [pendingPlanId, setPendingPlanId] = useState<string>("12-month");
    const [isSwitchOpen, setIsSwitchOpen] = useState<boolean>(false);
    const [paymentStatus, setPaymentStatus] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<PaymentForm>({
        mode: "onBlur",
        defaultValues: {
            cardholderName: "",
            cardNumber: "",
            expirationDate: "",
            securityCode: "",
        },
    });

    useEffect(() => {
        dispatch(hideNavbar());
        dispatch(hideSidebar());

        return () => {
            dispatch(showNavbar());
            dispatch(showSidebar());
        };
    }, [dispatch]);

    const selectedPlan = useMemo(
        () => planOptions.find((plan) => plan.id === selectedPlanId) ?? planOptions[0],
        [selectedPlanId],
    );

    useEffect(() => {
        if (!isSwitchOpen) {
            setPendingPlanId(selectedPlanId);
        }
    }, [isSwitchOpen, selectedPlanId]);

    useEffect(() => {
        if (!isSwitchOpen) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsSwitchOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isSwitchOpen]);

    const onSubmit = (data: PaymentForm) => {
        if (!data.cardholderName || !data.cardNumber || !data.expirationDate || !data.securityCode) {
            return;
        }

        setPaymentStatus(`Great! You're ready to enjoy insight with the ${selectedPlan.displayName}.`);
        reset({ cardholderName: "", cardNumber: "", expirationDate: "", securityCode: "" });
    };

    const handleClose = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate("/");
        }
    };

    const handleOpenSwitch = () => {
        setPendingPlanId(selectedPlanId);
        setIsSwitchOpen(true);
    };

    const handleCancelSwitch = () => {
        setPendingPlanId(selectedPlanId);
        setIsSwitchOpen(false);
    };

    const handleConfirmSwitch = () => {
        setSelectedPlanId(pendingPlanId);
        setIsSwitchOpen(false);
    };

    return (
        <div className="premium-page">
            <div className="premium-content">
                <button type="button" className="premium-close-button" aria-label="Close" onClick={handleClose}>
                    ×
                </button>

                <section className="premium-insight-card">
                    <h1 className="premium-insight-title">
                        Progress faster in history advantage with insight!
                    </h1>

                    <div className="premium-insight-table-card">
                        <div className="premium-table-wrapper">
                            <div className="premium-table-highlight" aria-hidden />
                            <table className="premium-table">
                                <thead>
                                    <tr>
                                        <th scope="col">&nbsp;</th>
                                        <th scope="col" className="premium-table-heading">Free</th>
                                        <th scope="col" className="premium-table-heading premium-table-heading-insight">
                                            Insight
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {featureRows.map((row) => (
                                        <tr key={row.label}>
                                            <th scope="row" className="premium-feature-label">
                                                {row.label}
                                            </th>
                                            <td>{row.free ? <CheckIcon /> : <DashIcon />}</td>
                                            <td>{row.insight ? <CheckIcon /> : <DashIcon />}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="premium-actions">
                        <button type="button" className="premium-primary-button">
                            get insight
                        </button>
                        <button type="button" className="premium-secondary-button">
                            no_thanks
                        </button>
                    </div>
                </section>

                <section className="premium-payment-card">
                    <div className="premium-plan-panel">
                        <div className="premium-plan-header">
                            <div className="premium-plan-label">Selected Plan:</div>
                            <div className="premium-plan-info">
                                <span className="premium-plan-name">{selectedPlan.displayName}</span>
                                <button
                                    type="button"
                                    className="premium-view-all"
                                    onClick={handleOpenSwitch}
                                >
                                    View All
                                </button>
                            </div>
                        </div>

                        <div className="premium-plan-billing">
                            <span className="premium-plan-billed-label">Billed:</span>
                            <span className="premium-plan-billed-value">{selectedPlan.billedToday}</span>
                        </div>

                        <div className="premium-plan-summary">
                            <div className="premium-plan-tagline">{selectedPlan.summary}</div>
                            <div className="premium-plan-price">
                                <span className="premium-plan-price-value">{selectedPlan.pricePerMonth}</span>
                                <span className="premium-plan-price-note">Save more with insight premium</span>
                            </div>
                            <div className="premium-plan-benefits">
                                {selectedPlan.benefits.map((benefit) => (
                                    <div className="premium-plan-benefit" key={benefit}>
                                        <CheckIcon />
                                        <span>{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {isSwitchOpen && (
                            <div className="premium-switch-card" role="dialog" aria-modal="true">
                                <div className="premium-switch-header">
                                    <h3>Switch Plan</h3>
                                </div>
                                <div className="premium-switch-options">
                                    {planOptions.map((plan) => (
                                        <button
                                            type="button"
                                            key={plan.id}
                                            className={`premium-switch-option${
                                                pendingPlanId === plan.id ? " is-active" : ""
                                            }`}
                                            onClick={() => setPendingPlanId(plan.id)}
                                        >
                                            <div className="premium-switch-option-info">
                                                <span className="premium-switch-term">{plan.term.toUpperCase()}</span>
                                                <span className="premium-switch-price">{plan.pricePerMonth}</span>
                                            </div>
                                            <span
                                                className={`premium-switch-radio${
                                                    pendingPlanId === plan.id ? " is-selected" : ""
                                                }`}
                                                aria-hidden
                                            />
                                        </button>
                                    ))}
                                </div>
                                <div className="premium-switch-actions">
                                    <button
                                        type="button"
                                        className="premium-switch-cancel"
                                        onClick={handleCancelSwitch}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        className="premium-switch-confirm"
                                        onClick={handleConfirmSwitch}
                                        disabled={pendingPlanId === selectedPlanId}
                                    >
                                        Switch
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <form className="premium-billing-panel" onSubmit={handleSubmit(onSubmit)}>
                        <h2 className="premium-billing-title">Billing information</h2>
                        <div className="premium-card-form">
                            <div className="premium-card-form-header">
                                <div className="premium-card-icon" aria-hidden />
                                <div className="premium-card-header-text">
                                    <span className="premium-card-title">Card</span>
                                    <div className="premium-card-brands">
                                        <span className="premium-card-badge premium-card-badge-visa">VISA</span>
                                        <span className="premium-card-badge premium-card-badge-mastercard">MC</span>
                                    </div>
                                </div>
                            </div>
                            <div className="premium-card-fields">
                                <label className="premium-field-group">
                                    <span className="premium-field-label">Cardholder Name</span>
                                    <input
                                        {...register("cardholderName", {
                                            required: "Please add the cardholder name.",
                                            minLength: { value: 2, message: "Name should include at least 2 characters." },
                                        })}
                                        type="text"
                                        placeholder="Full name on card"
                                        className="premium-input"
                                    />
                                    {errors.cardholderName && (
                                        <span className="premium-error">{errors.cardholderName.message}</span>
                                    )}
                                </label>
                                <label className="premium-field-group">
                                    <span className="premium-field-label">Card Number</span>
                                    <input
                                        {...register("cardNumber", {
                                            required: "Card number is required.",
                                            pattern: {
                                                value: /^(?:\d{4} ?){3}\d{4}$/,
                                                message: "Enter a valid 16-digit card number.",
                                            },
                                        })}
                                        type="text"
                                        placeholder="1234 1234 1234 1234"
                                        inputMode="numeric"
                                        className="premium-input"
                                    />
                                    {errors.cardNumber && (
                                        <span className="premium-error">{errors.cardNumber.message}</span>
                                    )}
                                </label>
                                <div className="premium-field-row">
                                    <label className="premium-field-group">
                                        <span className="premium-field-label">Expiration Date</span>
                                        <input
                                            {...register("expirationDate", {
                                                required: "Expiration date is required.",
                                                pattern: {
                                                    value: /^(0[1-9]|1[0-2])\/(\d{2})$/,
                                                    message: "Use MM/YY format.",
                                                },
                                            })}
                                            type="text"
                                            placeholder="12/34"
                                            inputMode="numeric"
                                            className="premium-input"
                                        />
                                        {errors.expirationDate && (
                                            <span className="premium-error">{errors.expirationDate.message}</span>
                                        )}
                                    </label>
                                    <label className="premium-field-group">
                                        <span className="premium-field-label">Security Code</span>
                                        <input
                                            {...register("securityCode", {
                                                required: "Security code is required.",
                                                pattern: {
                                                    value: /^\d{3,4}$/,
                                                    message: "Enter a valid 3 or 4 digit code.",
                                                },
                                            })}
                                            type="text"
                                            placeholder="CVC"
                                            inputMode="numeric"
                                            className="premium-input"
                                        />
                                        {errors.securityCode && (
                                            <span className="premium-error">{errors.securityCode.message}</span>
                                        )}
                                    </label>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="premium-payment-button">
                            get insight
                        </button>
                        {paymentStatus && <div className="premium-payment-status">{paymentStatus}</div>}
                    </form>
                </section>

                <p className="premium-disclaimer">
                    RECURRING BILLING. CANCEL ANYTIME IN SETTINGS. YOUR SUBSCRIPTION AUTOMATICALLY RENEWS AT THE SAME RATE
                    UNLESS YOU CANCEL AT LEAST 24 HOURS BEFORE THE END OF THE CURRENT TERM. TERMS & CONDITIONS APPLY.
                </p>
            </div>
        </div>
    );
};

export default Premium;
