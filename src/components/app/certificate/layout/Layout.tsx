import { Sidebar } from "../sidebar";
import { playlists } from "../data/playlists";
import React, { ReactNode } from "react"; // Import React and ReactNode

interface CertificatePageLayoutProps {
    children: ReactNode; // Update the type of children to ReactNode
}

export default function CertificatePageLayout({ children }: CertificatePageLayoutProps) { // Update the type of the function parameter
    return (
        <>
            <div className="hidden md:block">
                {/* <Menu /> */}
                <div className="bg-background">
                    <div className="grid lg:grid-cols-5">
                        <Sidebar playlists={playlists} className="hidden lg:block" />
                        <div className="col-span-3 lg:col-span-4 lg:border-l">
                        {children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}