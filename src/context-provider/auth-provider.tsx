'use client';

import React from "react";
import AuthContext from "./auth-context";
import { UserGetMe } from "../type/data";
import axios from "axios";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [user, setUser] = React.useState<UserGetMe | null>(null);
    const [loading, setIsloading] = React.useState(true);
    const [error, setError] = React.useState<Error | null>(null);

    function setLoggedIn(d: boolean) {
        setIsloading(true);
        setIsLoggedIn(d);
        setIsloading(false);
    }

    async function fetchUserGetMe() {
        setIsloading(true);
        try {
            const res = await axios.get("https://www.web-sebatikbarat.web.id/api/auth/me", {
                withCredentials: true,
            });
            if (res.status !== 200) throw new Error(res.data.message || "terjadi kesalahan");
            setUser(res.data.data);
            setLoggedIn(true);
            setError(null);
        } catch (err) {
            setUser(null);
            setError(err as Error);
            setLoggedIn(false);
        } finally {
            setIsloading(false);
        }
    }

    React.useEffect(() => {
        fetchUserGetMe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <AuthContext.Provider value={{
            loggedIn: isLoggedIn,
            setLoggedIn: setLoggedIn,
            user: user,
            loading: loading,
            error
        }}>
            {children}
        </AuthContext.Provider>
    );
}