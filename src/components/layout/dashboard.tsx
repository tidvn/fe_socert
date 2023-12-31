import { useSession } from "next-auth/react";
import { SiteHeader } from "../site-header";
import { userStore } from "@/store/user";
import { useEffect } from "react";

export default function DashboardLayout({ children }: any) {
    const { data: session, status }: any = useSession();
    const { fetchData }: any = userStore();
    useEffect(() => {
        if (status === "authenticated" && session.user.id) {
            fetchData(session.user.id);
        }
    }, [status]);
   
    if(status === "authenticated") return (
        <>
            <SiteHeader />
            {children}
        </>
    )
}