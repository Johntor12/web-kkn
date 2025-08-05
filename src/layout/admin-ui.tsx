import React from "react";
import AuthProvider from "@/context-provider/auth-provider";
import { Toaster } from "@/components/ui/sonner"

export default function AdminLayoutUI({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            {children}
            <Toaster />
        </AuthProvider>
    )
}