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
import { ReactElement, useEffect, useRef, useState } from "react"
import DashboardLayout from "@/components/layout/dashboard/dashboard"
import Link from "next/link"
import CertificatePageLayout from "@/components/app/certificate/layout/Layout"
import fetchClient from "@/utils/fetch-client"
import { isNil } from "lodash"
import { CertificateCard } from "@/components/app/certificate/CertificateCard"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { Card, CardContent } from "@/components/ui/card"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { ListCertificateCard } from "@/components/app/certificate/ListCertificateCard"
import { ItemSkeleton } from "@/components/app/dashboard/ItemSkeleton"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu"
import { MintButton } from "@/components/app/certificate/MintButton"

const CertificatePage = () => {
    const router = useRouter()
    const { certificateAddress } = router.query
    const { data: session }: any = useSession()
    const { userInfo } = session
    const { data, error, isLoading } = useSWR({
        method: "GET",
        endpoint: `/certificate/${certificateAddress}`,
    }, fetchClient, { refreshInterval: 500 });

    const { data: certMember, isLoading: certMember_IsLoading } = useSWR({
        method: "GET",
        endpoint: `/certificate/${certificateAddress}/member`,
    }, fetchClient, { refreshInterval: 500 });


    const certificateData = data?.data?.data || {}
    return (
        <>
            <div className="h-full px-4 py-6 lg:px-8">
                <div className="hidden flex-col md:flex">
                    <div className="flex h-16 items-center px-4">
                        <h2 className="text-2xl font-semibold tracking-tight">
                            Certificate Detail
                        </h2>
                        {
                            certificateData.status != "PUBLISHED" &&
                            (<div className="ml-auto flex items-center space-x-4">
                                <MintButton certMemberList={certMember?.data.data} creatorWallet={certificateData?.creators} />

                            </div>)
                        }

                    </div>
                </div>
                <div className="relative">
                    <div className="flex space-x-4 pb-4">

                        <Card className="w-full">
                            <CardContent>
                                {isLoading ? (
                                    <>
                                        <ItemSkeleton
                                            className="w-[250px]  mt-5"
                                            aspectRatio="square"
                                            width={250}
                                            height={250} />

                                    </>
                                ) : (
                                    <div className="grid grid-cols-6 gap-4 mt-5">
                                        <div className="col-span-2 ">

                                            <div className="rounded-md border-2 border-gray-200 flex items-center justify-center p-2 ">

                                                <AspectRatio className="bg-muted ">

                                                    <Image
                                                        src={certificateData?.metadata?.image}
                                                        alt="..."
                                                        fill
                                                        className="rounded-md object-cover"
                                                    />


                                                </AspectRatio>
                                            </div>
                                        </div>
                                        <div className="col-span-4 grid grid-rows">
                                            <div>
                                                Name : {certificateData?.metadata?.name}
                                            </div>
                                            {/* <div>
                                                organization : {certificateData?.metadata?.organization} :
                                            </div> */}
                                            <div>
                                                status : {certificateData?.status}
                                            </div>
                                            <div>
                                                address : {certificateData?.address}
                                            </div>
                                            <div>
                                                authenticator: {certificateData?.creators?.map((item: any) => (
                                                    <div>{item}</div>
                                                ))}
                                            </div>
                                        </div>

                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
                {/* <Separator className="my-4" /> */}
                <div className="relative">
                    <div className="flex space-x-4 pb-4">
                        <ListCertificateCard memberList={certMember?.data.data} isLoading={certMember_IsLoading} certificateAddress={certificateAddress as string} />
                    </div>

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


