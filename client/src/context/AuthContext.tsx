// AuthContext.tsx

import { createContext, useContext, useState } from "react";

type UserRole = "customer" | "creator" | "brand";

type SignupData = {
    name: string;
    email: string;
    password: string;
    role: UserRole | null;
};
type LoginData = {
    email: string;
    password: string;
}
type AuthContextType = {
    signupData: SignupData;
    loginData: LoginData;
    setLoginData: React.Dispatch<React.SetStateAction<LoginData>>;
    setSignupData: React.Dispatch<React.SetStateAction<SignupData>>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [signupData, setSignupData] = useState<SignupData>({
        name: "",
        email: "",
        password: "",
        role: 'customer',
    });

    const [loginData, setLoginData] = useState<LoginData>({
        email: "",
        password: "",
    })

    return (
        <AuthContext.Provider
            value={{ signupData, loginData, setLoginData, setSignupData }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }

    return context;
}