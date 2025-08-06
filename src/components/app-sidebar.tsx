import { ActifityOption, AuthContextInterface, SideBarMenu } from "@/type/data";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import { GalleryVerticalIcon, LayoutDashboardIcon, Newspaper, ColumnsSettingsIcon, Archive, StoreIcon } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Avatar,
    AvatarFallback,
} from "@/components/ui/avatar"
import { redirect } from "next/navigation";
import React from "react";
import AuthContext from "@/context-provider/auth-context";

function NavComponent({ dataItem }: { dataItem: SideBarMenu[] }) {
    return (
        <SidebarGroup>
            <SidebarGroupContent className="flex flex-col gap-2">
                <SidebarMenu>
                    {dataItem.map((item) => (
                        <SidebarMenuItem key={item.name}>
                            <SidebarMenuButton
                                className="cursor-pointer"
                                tooltip={item.name}
                                onClick={() => {
                                    if (item.optionname) {
                                        item.clickOption(item.optionname);
                                    } else {
                                        redirect(item.url);
                                    }
                                }}
                            >
                                {item.icon && <item.icon className="w-4 h-4 mr-2" />}
                                <span>{item.name}</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}


export function NavUser({ name = 'A', email = 'U' }: { name?: string, email?: string }) {

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="h-8 w-8 rounded-lg grayscale">
                                <AvatarFallback className="rounded-lg">A</AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">{name}</span>
                                <span className="text-muted-foreground truncate text-xs">
                                    {email}
                                </span>
                            </div>
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}


export default function AppSidebar({ onSelect }: { onSelect: (d: ActifityOption) => void }) {
    const { user } = React.useContext<AuthContextInterface>(AuthContext);
    const SidebarMenuItems: SideBarMenu[] = [
        {
            name: 'Beranda',
            icon: LayoutDashboardIcon,
            optionname: ActifityOption.beranda,
            url: "",
            clickOption: (option) => onSelect(option)
        },
        {
            name: 'Berita',
            icon: Newspaper,
            optionname: ActifityOption.berita,
            url: "",
            clickOption: (option) => onSelect(option)
        },
        {
            name: 'Gallery',
            icon: GalleryVerticalIcon,
            optionname: ActifityOption.galery,
            url: "",
            clickOption: (option) => onSelect(option)
        },
        {
            name: 'Peraturan',
            icon: ColumnsSettingsIcon,
            optionname: ActifityOption.peraturan,
            url: "",
            clickOption: (option) => onSelect(option)
        },
        {
            name: 'UMKM',
            icon: StoreIcon,
            optionname: ActifityOption.umkm,
            url: "",
            clickOption: (option) => onSelect(option)
        },
        {
            name: 'Arsip',
            icon: Archive,
            optionname: ActifityOption.arsip,
            url: "",
            clickOption: (option) => onSelect(option)
        },
    ];

    return (
        <Sidebar collapsible="offcanvas">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:!p-1.5"
                        >
                            <span className="text-base font-semibold">Admin Option</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavComponent dataItem={SidebarMenuItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser name={user?.username} email={user?.email ?? "no-email"} />
            </SidebarFooter>
        </Sidebar>
    );
}
