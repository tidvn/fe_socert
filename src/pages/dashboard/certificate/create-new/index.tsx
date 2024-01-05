'use client'
import { Metadata } from "next"
import Image from "next/image"
import { PlusCircledIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import useSWR from 'swr'
import { CertificateTemplate } from "@/components/app/certificate/CertificateTemplate"
import { Menu } from "@/components/app/certificate/menu"
import { PodcastEmptyPlaceholder } from "@/components/app/certificate/podcast-empty-placeholder"
import { Sidebar } from "@/components/app/certificate/sidebar"
import { listenNowAlbums, madeForYouAlbums } from "@/components/app/certificate/data/albums"
import { playlists } from "@/components/app/certificate/data/playlists"
import { ReactElement, useEffect, useState } from "react"
import DashboardLayout from "@/components/layout/dashboard/dashboard"
import Link from "next/link"
import CertificatePageLayout from "@/components/app/certificate/layout/Layout"
import fetchClient from "@/utils/fetch-client"
import { isNil } from "lodash"
import { CertificateCard } from "@/components/app/certificate/CertificateCard"
import { useSession } from "next-auth/react"

const CertificatePage = () => {
    const { data: session }: any = useSession()
    const { userInfo } = session
    const { data, error, isLoading } = useSWR({
        method: "GET",
        endpoint: `/organization/${userInfo?.currentOrg}/template`,
    }, fetchClient, { refreshInterval: 500 });


    const { privateCertificates, publicCertificates } = data?.data?.data || {}
    // console
    return (
        <>
            <div className="h-full px-4 py-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h2 className="text-2xl font-semibold tracking-tight">
                            Your Organization Template
                        </h2>

                    </div>
                </div>
                <Separator className="my-4" />
                <div className="relative">
                    <ScrollArea>
                        <div className="flex space-x-4 pb-4">
                            {(!isNil(privateCertificates) && isNil(error)) && privateCertificates.map((item: any) => (
                                <CertificateTemplate
                                    key={item.name}
                                    data={item}
                                    className="w-[150px]"
                                    aspectRatio="square"
                                    width={150}
                                    height={150}
                                />
                           ))}
                        </div>
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                </div>
                <div className="mt-6 space-y-1">
                    <h2 className="text-2xl font-semibold tracking-tight">
                        Public Template
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Demo Template
                    </p>
                </div>
                <Separator className="my-4" />
                <div className="relative">
                    <ScrollArea>
                        <div className="flex space-x-4 pb-4">


                            {(!isNil(publicCertificates) && isNil(error)) && publicCertificates.map((item: any) => (
                                <CertificateTemplate
                                    key={item.name}
                                    data={item}
                                    className="w-[150px]"
                                    aspectRatio="square"
                                    width={150}
                                    height={150}
                                />
                            ))}
                        </div>
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                </div>

            </div>

        </>
    )
}
CertificatePage.getLayout = function getLayout(page: ReactElement) {
    return (
        <DashboardLayout>
            <CertificatePageLayout>
                {page}
            </CertificatePageLayout>
        </DashboardLayout>
    )
}

export default CertificatePage


