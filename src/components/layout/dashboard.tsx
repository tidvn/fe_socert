import { SiteHeader } from "../site-header";

export default function DashboardLayout({ children }: any) {
    return (
        <>
            <SiteHeader />
            {children}
        </>
    )
}