import DashboardLayout from "@/components/layout/dashboard/dashboard"
import { ReactElement, useState } from "react"
import { Button } from "@/components/ui/button"
import UploadCsv from "@/components/app/create-cert/uploadCsv"
import { isNil } from 'lodash';
import { TableView } from "@/components/app/create-cert/table"
import CertificatePageLayout from "@/components/app/certificate/layout/Layout";



const AddStudentPage = () => {
    const [csv, setCSV] = useState<any>(null);
    return (
        <>

            <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
                <div className="flex items-center justify-end space-y-2">
                    {/* <div></div> */}
                    <div className="flex items-center space-x-2">
                        {/* {isNil(csv)
                            ? (<UploadCsv setCSV={setCSV} />)
                            : (<Button onClick={() => setCSV(null)} >Remove</Button>)
                        } */}
                        <UploadCsv setCSV={setCSV} />
                    </div>
                </div>
                <TableView data={csv?.data} />
            </div>
        </>
    )
}

AddStudentPage.getLayout = function getLayout(page: ReactElement) {
    return (

        <DashboardLayout>
            <CertificatePageLayout>
                {page}
            </CertificatePageLayout>
        </DashboardLayout>
    )
}

export default AddStudentPage