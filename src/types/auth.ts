import type { ReactNode } from "react";

export interface AuthContextType {
    token: string | null;
    login: (newToken: string) => void;
    logout: () => void;
}

export interface AuthProviderProps {
    children: ReactNode;
}
