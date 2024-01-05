import CertificatePageLayout from "@/components/app/certificate/layout/Layout"
import DashboardLayout from "@/components/layout/dashboard/dashboard"
import { ReactElement } from "react"
import { useRouter } from 'next/router'
import { CreateCertificateCollectionForm } from "@/components/app/certificate/createCollectionForm"

const CreateCertificatePage = () => {

    const router = useRouter()
    const { id } = router.query
    return (
        <>
            <CreateCertificateCollectionForm certId={id}  />
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