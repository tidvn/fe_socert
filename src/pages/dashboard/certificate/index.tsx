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
import { ReactElement } from "react"
import DashboardLayout from "@/components/layout/dashboard/dashboard"
import Link from "next/link"
import CertificatePageLayout from "@/components/app/certificate/layout/Layout"
import fetchClient from "@/utils/fetch-client"
import { isNil } from "lodash"
import { CertificateCard } from "@/components/app/certificate/CertificateCard"





const CertificatePage = () => {
    const { data, error, isLoading } = useSWR({
        method: "GET",
        endpoint: "/certificate/template"
    }, fetchClient);
    const listTemplate: any = data?.data.data
    console.log(listTemplate)
    return (
        <>
            <div className="h-full px-4 py-6 lg:px-8">
                <div className="space-between flex items-center">

                    <div className="ml-auto mr-4">
                        <Link href="/dashboard/certificate/create-new">
                            <Button>
                                <PlusCircledIcon className="mr-2 h-4 w-4" />
                                Create New
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h2 className="text-2xl font-semibold tracking-tight">
                            Certificate List
                        </h2>

                    </div>
                </div>
                <Separator className="my-4" />
                <div className="relative">
                    {/* <ScrollArea> */}
                        <div className="flex space-x-4 pb-4">
                            {(!isNil(listTemplate) && isNil(error)) && listTemplate.map((item: any) => (
                                <CertificateCard
                                    key={item.name}
                                    data={item}
                                    className="w-[250px]"
                                    aspectRatio="square"
                                    width={150}
                                    height={150}
                                />
                            ))}
                        </div>
                        {/* <ScrollBar orientation="horizontal" /> */}
                    {/* </ScrollArea> */}
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


