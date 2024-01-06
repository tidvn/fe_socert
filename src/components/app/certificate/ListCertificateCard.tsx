
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import React, { useImperativeHandle } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import useSWR from "swr"
import fetchClient from "@/utils/fetch-client"
import { useRouter } from "next/router"
import { isNil } from "lodash"
import { ItemSkeleton } from "../dashboard/ItemSkeleton"
import { CertificateCard } from "./CertificateCard"
import { CertificateMemberCard } from "./CertificateMember"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu"



interface CertificateCardProps extends React.HTMLAttributes<HTMLDivElement> {
    memberList: any,
    isLoading: boolean,
    certificateAddress: string

}

export function ListCertificateCard({
    memberList,
    isLoading,
    certificateAddress
}: CertificateCardProps) {


    const router = useRouter()


    if (!isLoading && memberList.length === 0) {
        return (
            <div className="flex h-[400px]  w-full shrink-0 items-center justify-center rounded-md border border-dashed">
                <div className="mx-auto flex w-full flex-col items-center justify-center text-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-10 w-10 text-muted-foreground"
                        viewBox="0 0 24 24"
                    >
                        <circle cx="12" cy="11" r="1" />
                        <path d="M11 17a1 1 0 0 1 2 0c0 .5-.34 3-.5 4.5a.5.5 0 0 1-1 0c-.16-1.5-.5-4-.5-4.5ZM8 14a5 5 0 1 1 8 0" />
                        <path d="M17 18.5a9 9 0 1 0-10 0" />
                    </svg>

                    <h3 className="mt-4 text-lg font-semibold">No Certificate Found</h3>
                    <p className="mb-4 mt-2 text-sm text-muted-foreground">
                        This collection has no items. Add one below.
                    </p>
                    <Button size="sm" className="relative" onClick={() => router.push(`/dashboard/certificate/${certificateAddress}/member`)}>
                        Add Certificate
                    </Button>

                </div>
            </div>
        )
    }
    return (
        <>
            <Tabs defaultValue="grid" className="w-full">
                <div className="space-between flex items-center">
                    <div className="text-2xl font-semibold tracking-tight">
                        Certificate Ownership
                    </div>
                    <div className="ml-auto mr-4">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="grid">Grid</TabsTrigger>
                            <TabsTrigger value="table">Table</TabsTrigger>
                        </TabsList>
                    </div>
                </div>

                <TabsContent value="grid">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2">
                        {
                            isLoading ? (
                                <>

                                    {Array.from({ length: 10 }).map((_, idx) => (
                                        <ItemSkeleton
                                            key={idx}
                                            className="w-[150px]"
                                            aspectRatio="square"
                                            width={150}
                                            height={150} />
                                    ))}

                                </>
                            ) : (!isNil(memberList) && memberList.map((item: any) => {
                                return !isNil(item) && (
                                    <ContextMenu>
                                        <ContextMenuTrigger>
                                            <CertificateMemberCard
                                                key={item.name}
                                                data={item}
                                                className="w-[150px] mt-5 "
                                                aspectRatio="square"
                                                width={150}
                                                height={150}
                                            />
                                        </ContextMenuTrigger>
                                        <ContextMenuContent>
                                            <ContextMenuItem>View</ContextMenuItem>
                                            <ContextMenuItem>Edit</ContextMenuItem>
                                        </ContextMenuContent>
                                    </ContextMenu>

                                )
                            }))
                        }
                    </div>
                </TabsContent>
                <TabsContent value="table">
                    <Card className="gap-2">


                    </Card>
                </TabsContent>
            </Tabs>
        </>

    )
}
