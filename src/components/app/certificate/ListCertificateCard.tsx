
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import useSWR from "swr"
import fetchClient from "@/utils/fetch-client"
import { useRouter } from "next/router"
import { isNil } from "lodash"
import { CertificateTemplate } from "./CertificateTemplate"



interface CertificateCardProps extends React.HTMLAttributes<HTMLDivElement> {
    certificateAddress: string
}

export function ListCertificateCard({
    certificateAddress,
}: CertificateCardProps) {
    const router = useRouter()
    const { data, error, isLoading } = useSWR({
        method: "GET",
        endpoint: `/certificate/${certificateAddress}/member`,
    }, fetchClient, { refreshInterval: 500 });

    if (isLoading) return <div>Loading...</div>

    if (!data) {
        return (
            <Button onClick={() => router.push(`/dashboard/certificate/${certificateAddress}/member`)} >
                Add Member
            </Button>
        )
    }
    const  memberList  = data?.data?.data || {}
    console.log(memberList)
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
                    {(!isNil(memberList) && isNil(error)) && memberList.map((item: any) => (
                            <CertificateTemplate
                                key={item.name}
                                data={item}
                                className="w-[150px]"
                                aspectRatio="square"
                                width={150}
                                height={150}
                            />
                        ))} 
                </TabsContent>
                <TabsContent value="table">
                    <Card>
                        
                        
                    </Card>
                </TabsContent>
            </Tabs>
        </>

    )
}
