"use client"
import { createContext, useContext, useState, useEffect } from "react";
import api from "@/utils/api";

interface AuthContextType {
    user: any;
    setProfile: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            api.get("/auth/profile", { headers: { Authorization: `Bearer ${token}` } })
                .then((res) => setUser(res.data))
                .catch(() => logout());
        }
    }, []);

    const setProfile = (token: string) => {
        api.get("/auth/profile", { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => setUser(res.data));
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setProfile, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};
