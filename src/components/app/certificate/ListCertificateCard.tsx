
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import useSWR from "swr"
import fetchClient from "@/utils/fetch-client"
import { useRouter } from "next/router"



interface CertificateCardProps extends React.HTMLAttributes<HTMLDivElement> {
    certificateAddress: string
}

export function ListCertificateCard({
    certificateAddress,
}: CertificateCardProps) {
    const router = useRouter()
    const { data, error, isLoading } = useSWR({
        method: "GET",
        endpoint: `/certificate/${certificateAddress}/students`,
    }, fetchClient, { refreshInterval: 500 });

    if (isLoading) return <div>Loading...</div>

    if (!data) {
        return (
            <Button onClick={() => router.push(`/dashboard/certificate/${certificateAddress}/student`)} >
                Add Member
            </Button>
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
                    {/* {(!isNil(publicCertificates) && isNil(error)) && publicCertificates.map((item: any) => (
                            <CertificateTemplate
                                key={item.name}
                                data={item}
                                className="w-[150px]"
                                aspectRatio="square"
                                width={150}
                                height={150}
                            />
                        ))}  */}
                </TabsContent>
                <TabsContent value="table">
                    <Card>
                        
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="current">Current password</Label>
                                <Input id="current" type="password" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="new">New password</Label>
                                <Input id="new" type="password" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Save password</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </>

    )
}
