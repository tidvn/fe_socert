import { CreateCertificateCollectionForm } from "@/components/app/certificate/createCollectionForm"
import CertificatePageLayout from "@/components/app/certificate/layout/Layout"
import DashboardLayout from "@/components/layout/dashboard/dashboard"
import { ReactElement } from "react"

const CreateCertificatePage = () => {
    return (
        <>
        
            <CreateCertificateCollectionForm />
        </>
    )
}

CreateCertificatePage.getLayout = function getLayout(page: ReactElement) {
    return (
        <DashboardLayout>
            <CertificatePageLayout>
                {page}
            </CertificatePageLayout>
        </DashboardLayout>
    )
}

export default CreateCertificatePage