import { signOut, useSession } from "next-auth/react";

import TeamSwitcher from "@/components/app/dashboard/team-switcher";
import { MainNav } from "@/components/app/dashboard/main-nav";
import { UserNav } from "@/components/app/dashboard/user-nav";
import { useWallet } from "@solana/wallet-adapter-react";
import { use, useEffect } from "react";

export default function DashboardLayout({ children }: any) {
    const { data: session, status }: any = useSession();
    const wallet = useWallet();

    // useEffect(() => {       
    //     console.log(wallet.publicKey?.toBase58())
    // }, [wallet.publicKey]);
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