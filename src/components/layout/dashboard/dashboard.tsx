import { useSession } from "next-auth/react";
// import { SiteHeader } from "../../site-header";
import { userStore } from "@/store/user";
import { useEffect } from "react";
import TeamSwitcher from "@/components/app/dashboard/team-switcher";
import { MainNav } from "@/components/app/dashboard/main-nav";
// import { Search } from "@/components/app/dashboard/search";
import { UserNav } from "@/components/app/dashboard/user-nav";

export default function DashboardLayout({ children }: any) {
    const { data: session, status }: any = useSession();
    const { fetchData }: any = userStore();
    useEffect(() => {
        if (status === "authenticated" && session.user.id) {
            fetchData(session.user.id);
        }
    }, [status]);

    if (status === "authenticated") return (
        <>
            <div className="border-b">
                <div className="flex h-16 items-center px-4">
                    <TeamSwitcher />
                    <MainNav className="mx-6" />
                    <div className="ml-auto flex items-center space-x-4">
                        {/* <Search /> */}
                        <UserNav />
                    </div>
                </div>
            </div>
            {children}
        </>
    )
}