import AppLogoIcon from './app-logo-icon';
import logo from '/public/logo.png';

export default function AppLogo() {
    return (
        <>
            <div className="text-sidebar-primary-foreground group flex aspect-square size-8 group-data-[collapsible=icon]:size-6.5! group-data-[collapsible=icon]:ml-[3px]! items-center justify-center rounded-md">
                <AppLogoIcon />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-none font-semibold">Sistem Absensi</span>
                <span className="mb-0.5 truncate leading-none font-semibold">DPMPTSP</span>
            </div>
        </>
    );
}
