import CertificatePageLayout from "@/components/app/certificate/layout/Layout"
import DashboardLayout from "@/components/layout/dashboard/dashboard"
import { ReactElement } from "react"
import { useRouter } from 'next/router'
import { CreateCertificateCollectionForm } from "@/components/app/certificate/createCollectionForm"
import { template } from "lodash"

const CreateCertificatePage = () => {

    const router = useRouter()
    const { templateId } = router.query
    return (
        <>
            <CreateCertificateCollectionForm templateId={templateId}  />
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