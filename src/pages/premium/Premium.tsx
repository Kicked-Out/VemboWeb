import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import "./premium.css";

type Feature = {
    id: string;
    label: string;
    isFreeIncluded: boolean;
    isInsightIncluded: boolean;
};

type Plan = {
    id: string;
    name: string;
    headlineLabel: string;
    priceDetail: string;
    billedToday: string;
    yearly?: boolean;
};

type CardFormInputs = {
    cardNumber: string;
    expiration: string;
    cvc: string;
};

const features: Feature[] = [
    {
        id: "learning",
        label: "Learning content",
        isFreeIncluded: true,
        isInsightIncluded: true,
    },
    {
        id: "hearts",
        label: "Unlimited hearts",
        isFreeIncluded: true,
        isInsightIncluded: true,
    },
    {
        id: "skills",
        label: "Skills practice",
        isFreeIncluded: true,
        isInsightIncluded: true,
    },
    {
        id: "mistakes",
        label: "Mistakes review",
        isFreeIncluded: true,
        isInsightIncluded: true,
    },
    {
        id: "challenge",
        label: "Free challenge entry",
        isFreeIncluded: true,
        isInsightIncluded: true,
    },
    {
        id: "ads",
        label: "No ads",
        isFreeIncluded: false,
        isInsightIncluded: true,
    },
];

const plans: Plan[] = [
    {
        id: "monthly",
        name: "1 month plan",
        headlineLabel: "1 MONTH",
        priceDetail: "$12.99 USD / mo",
        billedToday: "$12.99 USD today",
    },
    {
        id: "quarterly",
        name: "6 month plan",
        headlineLabel: "6 MONTH",
        priceDetail: "$9.49 USD / mo",
        billedToday: "$56.94 USD today",
    },
    {
        id: "yearly",
        name: "12 month plan",
        headlineLabel: "12 MONTH",
        priceDetail: "$6.99 USD / mo",
        billedToday: "$83.99 USD today",
        yearly: true,
    },
];

const CheckIcon = () => (
    <svg
        className="status-icon"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <circle cx="16" cy="16" r="14" stroke="white" strokeWidth="4" />
        <path
            d="M10.5 16.5L14.25 20.25L21.5 13"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const CrossIcon = () => (
    <svg className="status-icon status-icon--cross" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="14" stroke="white" strokeWidth="4" />
        <path d="M12 12L20 20" stroke="white" strokeWidth="4" strokeLinecap="round" />
        <path d="M20 12L12 20" stroke="white" strokeWidth="4" strokeLinecap="round" />
    </svg>
);

const CloseIcon = () => (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 4L18 18" stroke="#F5FAFF" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M18 4L4 18" stroke="#F5FAFF" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
);

export default function Premium() {
    const navigate = useNavigate();
    const [isSwitchOpen, setIsSwitchOpen] = useState(false);
    const [selectedPlanId, setSelectedPlanId] = useState<string>("yearly");
    const [pendingPlanId, setPendingPlanId] = useState<string>("yearly");
    const [submissionMessage, setSubmissionMessage] = useState<string>("");

    const selectedPlan = useMemo(() => plans.find((plan) => plan.id === selectedPlanId) ?? plans[0], [selectedPlanId]);

    const { register, handleSubmit, formState } = useForm<CardFormInputs>({
        defaultValues: {
            cardNumber: "",
            expiration: "",
            cvc: "",
        },
        mode: "onBlur",
    });

    const onSubmit: SubmitHandler<CardFormInputs> = (data) => {
        setSubmissionMessage(`Payment details submitted for card ending in ${data.cardNumber.slice(-4)}`);
    };

    const closeSwitchPlan = () => {
        setPendingPlanId(selectedPlanId);
        setIsSwitchOpen(false);
    };

    return (
        <div className="premium-page">
            <section className="premium-section">
                <div className="premium-offer">
                    <h1 className="premium-offer__title">Progress faster in history advantage with insight!</h1>

                    <div className="premium-offer__card">
                        <table className="premium-offer__table">
                            <thead>
                                <tr>
                                    <th className="premium-offer__column premium-offer__column--feature" scope="col"></th>
                                    <th className="premium-offer__column" scope="col">
                                        Free
                                    </th>
                                    <th className="premium-offer__column premium-offer__column--insight" scope="col">
                                        <span className="premium-offer__column-label">Insight</span>
                                        <span className="premium-offer__column-highlight" aria-hidden="true" />
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {features.map((feature) => (
                                    <tr key={feature.id} className="premium-offer__row">
                                        <th scope="row" className="premium-offer__feature">
                                            {feature.label}
                                        </th>
                                        <td className="premium-offer__status">
                                            {feature.isFreeIncluded ? <CheckIcon /> : <CrossIcon />}
                                        </td>
                                        <td className="premium-offer__status">
                                            {feature.isInsightIncluded ? <CheckIcon /> : <CrossIcon />}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="premium-offer__actions">
                        <button type="button" className="premium-offer__primary">
                            get insight
                        </button>
                        <button type="button" className="premium-offer__secondary">
                            no_thanks
                        </button>
                    </div>
                </div>
            </section>

            <section className="premium-section premium-section--billing">
                <button
                    type="button"
                    className="premium-billing__close"
                    aria-label="Close premium"
                    onClick={() => navigate(-1)}
                >
                    <CloseIcon />
                </button>

                <div className="premium-billing__panel">
                    <div className="premium-plan">
                        <div className="premium-plan__selected">
                            <div className="premium-plan__header">
                                <span className="premium-plan__label">Selected plan:</span>
                                <div className="premium-plan__selector">
                                    <div className="premium-plan__info">
                                        <span className="premium-plan__name">{selectedPlan.name}</span>
                                        <div className="premium-plan__view-all-wrapper">
                                            <button
                                                type="button"
                                                className="premium-plan__view-all"
                                                onClick={() => {
                                                    if (isSwitchOpen) {
                                                        closeSwitchPlan();
                                                    } else {
                                                        setPendingPlanId(selectedPlanId);
                                                        setIsSwitchOpen(true);
                                                    }
                                                }}
                                            >
                                                View All
                                            </button>
                                            {isSwitchOpen && (
                                                <div className="switch-plan">
                                                    <div className="switch-plan__header">Switch plan</div>
                                                    <div className="switch-plan__plans">
                                                        {plans.map((plan) => {
                                                            const isActive = pendingPlanId === plan.id;

                                                            return (
                                                                <button
                                                                    key={plan.id}
                                                                    type="button"
                                                                    className={`switch-plan__option${isActive ? " is-active" : ""}`}
                                                                    onClick={() => setPendingPlanId(plan.id)}
                                                                >
                                                                    <div className="switch-plan__info">
                                                                        <span className="switch-plan__term">{plan.headlineLabel}</span>
                                                                        <span className="switch-plan__price">{plan.priceDetail}</span>
                                                                    </div>
                                                                    <span className={`switch-plan__radio${isActive ? " is-checked" : ""}`}>
                                                                        <span className="switch-plan__dot" />
                                                                    </span>
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                    <div className="switch-plan__actions">
                                                        <button type="button" className="switch-plan__cancel" onClick={closeSwitchPlan}>
                                                            Cancel
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="switch-plan__confirm"
                                                            onClick={() => {
                                                                setSelectedPlanId(pendingPlanId);
                                                                setIsSwitchOpen(false);
                                                            }}
                                                        >
                                                            Switch
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="premium-plan__billing">
                            <span className="premium-plan__label">Billed:</span>
                            <span className="premium-plan__amount">{selectedPlan.billedToday}</span>
                        </div>

                        <div className="premium-plan__content">
                            <p className="premium-plan__copy">
                                Enjoy uninterrupted access to exclusive lessons, in-depth insights, and a learning journey
                                tailored to you.
                            </p>
                            <ul className="premium-plan__benefits">
                                <li>Access every course and upcoming history drops.</li>
                                <li>Track long-term progress with advanced insights.</li>
                                <li>Compete ad-free and unlock seasonal challenges.</li>
                            </ul>
                        </div>
                    </div>

                    <div className="premium-payment">
                        <div className="premium-payment__header">Billing information</div>

                        <form className="premium-payment__form" onSubmit={handleSubmit(onSubmit)} noValidate>
                            <div className="premium-payment__form-header">
                                <div className="premium-payment__card-icon" aria-hidden="true">
                                    <span className="premium-payment__chip" />
                                </div>
                                <div className="premium-payment__form-title">Card</div>
                                <div className="premium-payment__brands" aria-hidden="true">
                                    <span className="premium-payment__brand premium-payment__brand--visa">VISA</span>
                                    <span className="premium-payment__brand premium-payment__brand--mastercard">
                                        <span className="premium-payment__brand-circle premium-payment__brand-circle--left" />
                                        <span className="premium-payment__brand-circle premium-payment__brand-circle--right" />
                                    </span>
                                </div>
                            </div>

                            <div className="premium-payment__field">
                                <label htmlFor="cardNumber" className="premium-payment__label">
                                    Card number
                                </label>
                                <input
                                    id="cardNumber"
                                    type="text"
                                    placeholder="1234 1234 1234 1234"
                                    className="premium-payment__input"
                                    {...register("cardNumber", {
                                        required: "Card number is required",
                                        pattern: {
                                            value: /^(\d{4} \d{4} \d{4} \d{4})$/,
                                            message: "Enter a valid card number",
                                        },
                                    })}
                                />
                                {formState.errors.cardNumber && (
                                    <span className="premium-payment__error">{formState.errors.cardNumber.message}</span>
                                )}
                            </div>

                            <div className="premium-payment__row">
                                <div className="premium-payment__field">
                                    <label htmlFor="expiration" className="premium-payment__label">
                                        Expiration date
                                    </label>
                                    <input
                                        id="expiration"
                                        type="text"
                                        placeholder="MM/YY"
                                        className="premium-payment__input"
                                        {...register("expiration", {
                                            required: "Expiration date is required",
                                            pattern: {
                                                value: /^(0[1-9]|1[0-2])\/(\d{2})$/,
                                                message: "Use MM/YY format",
                                            },
                                        })}
                                    />
                                    {formState.errors.expiration && (
                                        <span className="premium-payment__error">{formState.errors.expiration.message}</span>
                                    )}
                                </div>
                                <div className="premium-payment__field">
                                    <label htmlFor="cvc" className="premium-payment__label">
                                        Security code
                                    </label>
                                    <input
                                        id="cvc"
                                        type="text"
                                        placeholder="CVC"
                                        className="premium-payment__input"
                                        {...register("cvc", {
                                            required: "Security code is required",
                                            pattern: {
                                                value: /^\d{3,4}$/,
                                                message: "Enter a valid code",
                                            },
                                        })}
                                    />
                                    {formState.errors.cvc && (
                                        <span className="premium-payment__error">{formState.errors.cvc.message}</span>
                                    )}
                                </div>
                            </div>

                            <button type="submit" className="premium-payment__submit">
                                get insight
                            </button>
                            {submissionMessage && <div className="premium-payment__success">{submissionMessage}</div>}
                        </form>
                    </div>

                </div>

                <div className="premium-billing__footer">
                    Resubscribing automatically renews the same plan unless you cancel at least 24 hours prior to the end of
                    your current term. You can cancel anytime in settings. Terms & Conditions
                </div>
            </section>
        </div>
    );
}
