import AppSidebar from "@/components/app-sidebar";
import { SiteHeader } from "@/components/sidebar-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ActifityOption } from "@/type/data";

import React from "react";
import { LogoutButton } from "./logout-button";

export default function BerandaLayout({ option, setOption, children }: { option: ActifityOption, setOption: (d: ActifityOption) => void, children: React.ReactNode }) {
    return (
        <div>
            <SidebarProvider
                style={
                    {
                        "--sidebar-width": "calc(var(--spacing) * 72)",
                        "--header-height": "calc(var(--spacing) * 12)",
                    } as React.CSSProperties
                }
            >
                <AppSidebar onSelect={setOption} />
                <SidebarInset>
                    <SiteHeader name={option}>
                        <LogoutButton />
                    </SiteHeader>
                    <div className="flex flex-1 flex-col">
                        <div className="@container/main flex flex-1 flex-col gap-2">
                            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                                <div className="px-4 lg:px-6">
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </div>
    )
}