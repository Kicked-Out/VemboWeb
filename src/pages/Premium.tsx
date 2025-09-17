import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { hideNavbar, hideSidebar, showNavbar, showSidebar } from "../slices/menuSlice";
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
    { label: "Skills practice", free: false, insight: true },
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

const Premium = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedPlanId, setSelectedPlanId] = useState<string>("12-month");
    const [pendingPlanId, setPendingPlanId] = useState<string>("12-month");
    const [isSwitchOpen, setIsSwitchOpen] = useState<boolean>(false);
    const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
    const [pageNumber, setPageNumber] = useState<number>(1);

    const { register, handleSubmit, reset } = useForm<PaymentForm>({
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
        [selectedPlanId]
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
        navigate("/");
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
                {pageNumber === 1 ? (
                    <section className="premium-insight-card">
                        <h1 className="premium-insight-title">Progress faster in history advantage with insight!</h1>

                        <div className="premium-insight-table-card">
                            <div className="premium-table-highlight" aria-hidden />
                            <table className="premium-table">
                                <thead>
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col" className="premium-table-heading">
                                            Free
                                        </th>
                                        <th scope="col" className="premium-table-heading premium-table-heading-insight">
                                            <img
                                                className="insight-icon"
                                                src="/src/assets/icons/insight/insight_icon.png"
                                            />
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {featureRows.map((row) => (
                                        <tr key={row.label}>
                                            <th scope="row" className="premium-feature-label">
                                                {row.label}
                                            </th>

                                            <td>
                                                <img
                                                    className="insight-feature-availability-icon"
                                                    src={`/src/assets/icons/insight/${
                                                        row.free ? "check" : "dash"
                                                    }_icon.png`}
                                                />
                                            </td>

                                            <td>
                                                <img
                                                    className="insight-feature-availability-icon"
                                                    src={`/src/assets/icons/insight/${
                                                        row.insight ? "check" : "dash"
                                                    }_icon.png`}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="premium-actions">
                            <button
                                type="button"
                                className="premium-primary-button"
                                onClick={() => {
                                    setPageNumber(2);
                                }}
                            >
                                get insight
                            </button>
                            <button type="button" className="premium-secondary-button" onClick={handleClose}>
                                no, thanks
                            </button>
                        </div>
                    </section>
                ) : (
                    <section className="premium-payment-card">
                        <img
                            className="premium-close-btn"
                            src="/src/assets/icons/insight/close_icon.png"
                            onClick={handleClose}
                        />

                        <div className="insight-payment-card">
                            <div className="premium-plan-panel">
                                <div className="premium-plan-header">
                                    <div className="premium-plan-label">Selected Plan:</div>
                                    <div className="premium-plan-info">
                                        <span className="premium-plan-name">{selectedPlan.displayName}</span>
                                        <button type="button" className="premium-view-all" onClick={handleOpenSwitch}>
                                            View All
                                        </button>
                                    </div>
                                </div>

                                <div className="premium-plan-billing">
                                    <span className="premium-plan-billed-label">Billed:</span>
                                    <span className="premium-plan-billed-value">{selectedPlan.billedToday}</span>
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
                                                        <span className="premium-switch-term">
                                                            {plan.term.toUpperCase()}
                                                        </span>
                                                        <span className="premium-switch-price">
                                                            {plan.pricePerMonth}
                                                        </span>
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
                                        <img
                                            className="premium-card-icon"
                                            src="/src/assets/icons/insight/card_icon.png"
                                        />
                                        <div className="premium-card-header-text">
                                            <span className="premium-card-title">Card</span>
                                        </div>
                                    </div>
                                    <div className="premium-card-fields">
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
                                            <div className="premium-card-icons">
                                                <img
                                                    className="premium-card-icon-visa"
                                                    src="/src/assets/icons/insight/visa_icon.png"
                                                />
                                                <img
                                                    className="premium-card-icon-mastercard"
                                                    src="/src/assets/icons/insight/mastercard_icon.png"
                                                />
                                            </div>
                                            {/* {errors.cardNumber && (
                                                <span className="premium-error">{errors.cardNumber.message}</span>
                                            )} */}
                                        </label>
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
                                                placeholder="MM/YO"
                                                inputMode="numeric"
                                                className="premium-input"
                                            />
                                            {/* {errors.expirationDate && (
                                                <span className="premium-error">{errors.expirationDate.message}</span>
                                            )} */}
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
                                            {/* {errors.securityCode && (
                                                <span className="premium-error">{errors.securityCode.message}</span>
                                            )} */}
                                        </label>
                                    </div>
                                </div>
                                <button type="submit" className="premium-payment-button">
                                    Get Insight
                                </button>
                                {paymentStatus && <div className="premium-payment-status">{paymentStatus}</div>}
                            </form>
                        </div>

                        <p className="premium-disclaimer">
                            Recurring billing, cancel anytime <br /> Your subscription automatically renews for the same
                            length term at the same price unless you cancel at least 24 <br /> hours prior to the end of
                            your current term. You may cancel anytime in Settings. <br /> Terms & Conditions
                        </p>
                    </section>
                )}
            </div>
        </div>
    );
};

export default Premium;
