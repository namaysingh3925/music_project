import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { api } from "../api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            setLoading(false);
            return;
        }
        api.me()
            .then((d) => setUser(d.user))
            .catch(() => {
                localStorage.removeItem("authToken");
                setUser(null);
            })
            .finally(() => setLoading(false));
    }, []);

    const login = useCallback(async (email, password) => {
        const d = await api.login({ email, password });
        localStorage.setItem("authToken", d.token);
        setUser(d.user);
        return d.user;
    }, []);

    const signup = useCallback(async (payload) => {
        const d = await api.signup(payload);
        localStorage.setItem("authToken", d.token);
        setUser(d.user);
        return d.user;
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem("authToken");
        setUser(null);
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
