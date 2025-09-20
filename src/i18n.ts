import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const enTranslation = {
    brand: "Vembo",
    nav: {
        learn: "Learn",
        practice: "Practice",
        leaderboards: "Leaderboards",
        quests: "Quests",
        shop: "Shop",
        profile: "Profile",
        more: "More",
        settings: "Settings",
        logout: "Log out",
        help: "Help",
        language: {
            label: "Language",
            english: "English",
            ukrainian: "Ukrainian",
        },
    },
    footer: {
        copyright: "© {{year}} {{brand}}. All rights reserved.",
    },
    auth: {
        common: {
            signUp: "Sign Up",
            logIn: "LOG IN",
            forgot: "FORGOT?",
            emailOrName: "Email or Name",
            password: "Password",
            or: "OR",
            google: "GOOGLE",
            facebook: "FACEBOOK",
            termsSignIn: "By signing in to {{brand}}, you agree to our Terms and Privacy Policy.",
            recaptcha:
                "This site is protected by reCAPTCHA Enterprise and the Google Privacy Policy and Terms of Service apply.",
        },
        login: {
            welcome: "<0>Welcome back </0><1>explorer</1><2>!</2>",
            tagline: "<0>History's calling, and the globe's spinning — hop on, </0><1>{{brand}}'s</1><2> taking off!</2>",
        },
        register: {
            loginCta: "Log in",
            welcome: "<0>Ready to </0><1>roam</1><2>?</2>",
            subtitle: "<0>Create your passport to the past and future — </0><1>{{brand}}</1><2> will be your guide!</2>",
            name: "Name",
            email: "Email",
            confirmPassword: "Confirm Password",
            createAccount: "CREATE ACCOUNT",
            passwordMinLength: "Password must be at least 8 characters",
            passwordMismatch: "Passwords do not match",
            terms: "By signing up to {{brand}}, you agree to our Terms and Privacy Policy.",
        },
        forgotPassword: {
            title: "Forgot password",
            subtitle: "We will send you instructions on how to reset your password by email.",
            emailPlaceholder: "E-mail or Username",
            submit: "SUBMIT",
            goBack: "Go back",
            resend: "Resend letter",
        },
        resetPassword: {
            title: "Reset password",
            newPassword: "New Password",
            confirmNewPassword: "Confirm New Password",
            submit: "SUBMIT",
        },
        emailConfirmation: {
            title: "Thank you!",
            subtitle: "Please check your email.",
            return: "Return to Log in",
            alt: "Email icon",
        },
        passwordUpdated: {
            title: "<0>Password </0><1>Updated</1><2>!</2>",
            message:
                "<0>Your password has been changed successfully. Use your </0><1>new password</1><2> to Log in.</2>",
            return: "Return to Log in",
        },
    },
    pages: {
        notFound: {
            title: "404 Not Found",
            description: "The page you are looking for does not exist.",
        },
        contact: {
            title: "Contact us",
            press: "Journalists and bloggers, please reach out to:",
            partner: "Looking to partner with us?",
            bearAlt: "Vembo bear",
        },
        about: {
            title: "About us",
            personalized: {
                title: "Personalized education.",
                description:
                    "Everyone learns in different ways. For the first time in history, we can analyze how millions of people learn at once to create the most effective educational system possible and tailor it to each student. Our ultimate goal is to give everyone access to a private tutor experience through technology.",
            },
            fun: {
                title: "Making learning fun.",
                description:
                    "It's hard to stay motivated when learning online, so we made Vembo so fun, some people would prefer picking up new skills over playing a game.",
            },
            accessible: {
                title: "Universally accessible.",
                description:
                    "We created Vembo so that everyone could have a chance to learn history. Free education – no hidden fees, no premium content, just free. Vembo is used by the richest man in the world and many Hollywood stars, and at the same time by public school students in developing countries. We believe true equality is when spending more can't buy you a better education.",
            },
        },
        terms: {
            title: "<0>Terms and Conditions of Service for </0><1>Young Explorers</1>",
            subtitle: "Please note that these Terms and Conditions of Service were last revised on July 21st, 2025.",
            sections: {
                who: {
                    heading: "1. Who can use Vembo?",
                    description: "You need to be at least 13 years old, or have permission from your parent or guardian.",
                },
                using: {
                    heading: "2. Using Vembo",
                    description:
                        "Vembo is made for learning history and having fun. Please use it only for yourself and don't try to copy or sell it. Be kind and respectful if you chat or share with others.",
                },
                premium: {
                    heading: "3. Premium Access",
                    description:
                        "Some parts of Vembo are free, and some are Premium. Premium gives you extra stories, animations, and special journeys. Payments are handled safely through the app store.",
                },
                learning: {
                    heading: "4. Learning Materials",
                    description:
                        "Vembo tells you facts about history, so you can learn. Vembo tries its best to be accurate, but remember that it's not the same as learning in school.",
                },
                privacy: {
                    heading: "5. Privacy",
                    description:
                        "We collect only a little information to help run the program and serve you better. We never sell your information and we keep your personal details safe.",
                },
                changes: {
                    heading: "6. Changes",
                    description:
                        "Sometimes we will update these rules. If you keep using Vembo after changes, it means you agree to them.",
                },
                questions: {
                    heading: "7. Questions",
                    description: "If you or your parent/guardian have questions, email us at: support@vembo.app",
                },
            },
            bottom: "By creating an account or using {{brand}}, you agree to follow these rules.",
        },
    },
} as const;

const ukTranslation: typeof enTranslation = {
    brand: "Vembo",
    nav: {
        learn: "Навчання",
        practice: "Практика",
        leaderboards: "Таблиці лідерів",
        quests: "Завдання",
        shop: "Крамниця",
        profile: "Профіль",
        more: "Більше",
        settings: "Налаштування",
        logout: "Вийти",
        help: "Допомога",
        language: {
            label: "Мова",
            english: "Англійська",
            ukrainian: "Українська",
        },
    },
    footer: {
        copyright: "© {{year}} {{brand}}. Усі права захищено.",
    },
    auth: {
        common: {
            signUp: "Зареєструватися",
            logIn: "УВІЙТИ",
            forgot: "ЗАБУЛИ?",
            emailOrName: "Електронна пошта або ім'я",
            password: "Пароль",
            or: "АБО",
            google: "GOOGLE",
            facebook: "FACEBOOK",
            termsSignIn: "Увійшовши до {{brand}}, ви погоджуєтесь з нашими Умовами та Політикою конфіденційності.",
            recaptcha:
                "Цей сайт захищено reCAPTCHA Enterprise, застосовуються Політика конфіденційності та Умови використання Google.",
        },
        login: {
            welcome: "<0>Раді бачити знову, </0><1>досліднику</1><2>!</2>",
            tagline: "<0>Історія кличе, а земна куля обертається — стрибай, </0><1>{{brand}}</1><2> вже вирушає!</2>",
        },
        register: {
            loginCta: "Увійти",
            welcome: "<0>Готові </0><1>мандрувати</1><2>?</2>",
            subtitle: "<0>Створіть свій паспорт у минуле й майбутнє — </0><1>{{brand}}</1><2> буде вашим провідником!</2>",
            name: "Ім'я",
            email: "Електронна пошта",
            confirmPassword: "Підтвердьте пароль",
            createAccount: "СТВОРИТИ ОБЛІКОВИЙ ЗАПИС",
            passwordMinLength: "Пароль має містити щонайменше 8 символів",
            passwordMismatch: "Паролі не збігаються",
            terms: "Реєструючись у {{brand}}, ви погоджуєтесь з нашими Умовами та Політикою конфіденційності.",
        },
        forgotPassword: {
            title: "Забули пароль",
            subtitle: "Ми надішлемо вам інструкції електронною поштою, як скинути пароль.",
            emailPlaceholder: "Електронна пошта або ім'я користувача",
            submit: "НАДІСЛАТИ",
            goBack: "Повернутися",
            resend: "Надіслати лист ще раз",
        },
        resetPassword: {
            title: "Скидання пароля",
            newPassword: "Новий пароль",
            confirmNewPassword: "Підтвердьте новий пароль",
            submit: "НАДІСЛАТИ",
        },
        emailConfirmation: {
            title: "Дякуємо!",
            subtitle: "Перевірте свою електронну пошту.",
            return: "Повернутися до входу",
            alt: "Значок електронної пошти",
        },
        passwordUpdated: {
            title: "<0>Пароль </0><1>оновлено</1><2>!</2>",
            message:
                "<0>Ваш пароль успішно змінено. Використайте </0><1>новий пароль</1><2>, щоб увійти.</2>",
            return: "Повернутися до входу",
        },
    },
    pages: {
        notFound: {
            title: "404 Не знайдено",
            description: "Сторінки, яку ви шукаєте, не існує.",
        },
        contact: {
            title: "Зв'яжіться з нами",
            press: "Журналісти та блогери, звертайтеся за адресою:",
            partner: "Бажаєте співпрацювати з нами?",
            bearAlt: "Ведмідь Vembo",
        },
        about: {
            title: "Про нас",
            personalized: {
                title: "Персоналізована освіта.",
                description:
                    "Кожен навчається по-своєму. Вперше в історії ми можемо аналізувати, як мільйони людей навчаються одночасно, щоб створити максимально ефективну освітню систему й адаптувати її до кожного учня. Наша кінцева мета — дати кожному доступ до досвіду приватного наставника завдяки технологіям.",
            },
            fun: {
                title: "Навчання як розвага.",
                description:
                    "Онлайн-навчання часто складно підтримувати без мотивації, тому ми зробили Vembo настільки захопливим, що дехто воліє здобувати нові навички замість гри.",
            },
            accessible: {
                title: "Доступно кожному.",
                description:
                    "Ми створили Vembo, щоб кожен мав шанс вивчати історію. Безкоштовна освіта — жодних прихованих платежів, жодного преміум-контенту, просто безкоштовно. Vembo користуються і найбагатша людина світу, і багато голлівудських зірок, і водночас учні державних шкіл у країнах, що розвиваються. Ми вважаємо, що справжня рівність — це коли більші витрати не можуть купити кращу освіту.",
            },
        },
        terms: {
            title: "<0>Умови та положення сервісу для </0><1>Юних дослідників</1>",
            subtitle: "Зверніть увагу, що ці Умови та положення сервісу востаннє оновлено 21 липня 2025 року.",
            sections: {
                who: {
                    heading: "1. Хто може користуватися Vembo?",
                    description: "Вам має бути щонайменше 13 років або потрібно мати дозвіл батьків чи опікуна.",
                },
                using: {
                    heading: "2. Використання Vembo",
                    description:
                        "Vembo створено для вивчення історії та розваг. Використовуйте його лише для себе й не намагайтеся копіювати або продавати. Будьте доброзичливими та поважними, коли спілкуєтеся чи ділитеся з іншими.",
                },
                premium: {
                    heading: "3. Преміум-доступ",
                    description:
                        "Деякі частини Vembo безкоштовні, а деякі — преміум. Преміум надає додаткові історії, анімації та особливі подорожі. Платежі безпечно обробляє магазин застосунків.",
                },
                learning: {
                    heading: "4. Навчальні матеріали",
                    description:
                        "Vembo розповідає факти з історії, щоб ви навчалися. Vembo докладає зусиль, щоб бути точним, але це не те саме, що навчання в школі.",
                },
                privacy: {
                    heading: "5. Конфіденційність",
                    description:
                        "Ми збираємо лише мінімальну інформацію, щоб працювати краще. Ми ніколи не продаємо ваші дані та зберігаємо особисту інформацію в безпеці.",
                },
                changes: {
                    heading: "6. Зміни",
                    description:
                        "Іноді ми оновлюватимемо ці правила. Якщо ви продовжуєте користуватися Vembo після змін, це означає, що ви погоджуєтеся з ними.",
                },
                questions: {
                    heading: "7. Питання",
                    description: "Якщо у вас чи у ваших батьків/опікунів є питання, напишіть нам на: support@vembo.app",
                },
            },
            bottom: "Створюючи обліковий запис або користуючись {{brand}}, ви погоджуєтесь дотримуватися цих правил.",
        },
    },
};

const storedLanguage = typeof window !== "undefined" ? localStorage.getItem("vemboLanguage") : null;

const resources = {
    en: {
        translation: enTranslation,
    },
    uk: {
        translation: ukTranslation,
    },
} as const satisfies Record<string, { translation: typeof enTranslation }>;

i18n.use(initReactI18next).init({
    resources,
    fallbackLng: "en",
    defaultNS: "translation",
    interpolation: {
        escapeValue: false,
    },
    lng: storedLanguage ?? "en",
    supportedLngs: ["en", "uk"],
});

if (typeof window !== "undefined") {
    i18n.on("languageChanged", (lng) => {
        localStorage.setItem("vemboLanguage", lng);
    });
}

export default i18n;
