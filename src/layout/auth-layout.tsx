'use client';

import AuthContext from "@/context-provider/auth-context";
import { AuthContextInterface } from "@/type/data";
import React from "react";

import { useRouter } from "next/navigation";
import { Loader } from "@/components/loader";


export default function AuthLayout({ children }: { children: React.ReactNode }) {
    const { loading, loggedIn } = React.useContext<AuthContextInterface>(AuthContext);
    const router = useRouter();

    React.useEffect(() => {
        if (!loading && !loggedIn) {
            router.push('/login');
        }
    }, [loading, loggedIn, router]);

    if (loading) return <Loader />;
    if (!loggedIn) return null;

    return <>{children}</>;

}