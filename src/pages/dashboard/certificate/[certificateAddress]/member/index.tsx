import DashboardLayout from "@/components/layout/dashboard/dashboard"
import { ReactElement, useState } from "react"
import { Button } from "@/components/ui/button"
import UploadCsv from "@/components/app/create-cert/uploadCsv"
import { isNil } from 'lodash';
import { TableView } from "@/components/app/create-cert/table"
import CertificatePageLayout from "@/components/app/certificate/layout/Layout";
import { useRouter } from "next/router";
import { handler } from "tailwindcss-animate";
import fetchClient from "@/utils/fetch-client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import Link from "next/link";




function convertToObjects(originalData: any) {
    const headers = originalData[0];
    const colNumber = headers.length;
    const formattedData = originalData.slice(1).map((row: any) => {
        if (row.length != colNumber) return;
        const rowData: any = {};
        headers.forEach((header: any, index: number) => {
            rowData[header] = row[index];
        });
        return rowData;
    });
    return formattedData.filter((item: any) => !isNil(item));
}
const AddmemberPage = () => {
    const router = useRouter()
    const { certificateAddress } = router.query

    const [csv, setCSV] = useState<any>();

    const handlerUpdateMember = async () => {
        if (isNil(csv)) return;
        const object = convertToObjects(csv.data)
        await fetchClient({
            method: 'POST',
            endpoint: `/certificate/${certificateAddress}/member`,
            body: convertToObjects(csv.data),
        })
    };

    return (
        <>

            <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
                {/* <Alert> */}
                {/* <AlertTitle>Hey !</AlertTitle>
                    <AlertDescription>
                        This certificate template has some custom information,<Link href={`/`}>download the sample csv file here</Link>
                    </AlertDescription> */}
                <div role="alert" className="rounded border-s-4 border-green-500 bg-green-50 p-4">
                    <div className="flex items-center gap-2 text-green-800">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                            <path
                                fillRule="evenodd"
                                d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                clipRule="evenodd"
                            />
                        </svg>

                        <strong className="block font-medium"> Something went wrong </strong>
                    </div>

                    <p className="mt-2 text-sm text-green-700">
                        This certificate template has some custom information , <Link href={`/`}>download the sample csv file here</Link>

                    </p>
                </div>
                {/* </Alert> */}
                <div className="flex items-center justify-end space-y-2">

                    <div className="flex items-center space-x-2">
                        {/* {isNil(csv)
                            ? (<UploadCsv setCSV={setCSV} />)
                            : (<Button onClick={() => setCSV(null)} >Remove</Button>)
                        } */}
                        <UploadCsv setCSV={setCSV} />
                    </div>
                </div>
                <TableView data={csv?.data} />
                <div className="flex items-end space-x-2">
                    <Button onClick={handlerUpdateMember}>Save</Button>
                </div>
            </div>

        </>
    )
}

AddmemberPage.getLayout = function getLayout(page: ReactElement) {
    return (

        <DashboardLayout>
            <CertificatePageLayout>
                {page}
            </CertificatePageLayout>
        </DashboardLayout>
    )
}

export default AddmemberPage