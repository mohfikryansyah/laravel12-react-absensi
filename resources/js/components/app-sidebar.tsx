import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Building2Icon, CalendarCheckIcon, CheckCircleIcon, Folder, LayoutGrid, LocateFixedIcon, UserCircle2Icon } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutGrid,
    },
];

const secondaryNavItems: NavItem[] = [
    {
        title: 'Lokasi Presensi',
        url: '/office',
        icon: LocateFixedIcon,
    },
    {
        title: 'Kehadiran',
        url: '/attendances',
        icon: CalendarCheckIcon,
    },
];

const tertiaryNavItems: NavItem[] = [
    {
        title: 'Pegawai',
        url: '/employees',
        icon: UserCircle2Icon,
    },
    {
        title: 'Divisi',
        url: '/devisi',
        icon: Building2Icon,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        url: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        url: 'https://laravel.com/docs/starter-kits',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/">
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} label='Overview' />
                <NavMain items={secondaryNavItems} label='Lokasi dan Kehadiran  ' />
                <NavMain items={tertiaryNavItems} label='Manajemen Pegawai' />
            </SidebarContent>

            <SidebarFooter>
                {/* <NavFooter items={footerNavItems} className="mt-auto" /> */}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
