import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import React from 'react';


interface Certificate {
  id: string;
  address: string;
  template: string;
  image: string;
  metadata: string;
  author: string;
}

interface CertificateTemplate {
  id: string;
  name: string;
  organizationId: string;
  background: string;
  height: number;
  width: number;
  attributes: string;
  demo: string;
  public: boolean;
}

interface StudentCertificate {
  id: string;
  certificate_id: string;
  address: string;
  name: string;
  metadata: string;
}

interface ApiResponse {
  certificate: Certificate;
  certificateTemplate: CertificateTemplate;
  studentCertificate: StudentCertificate;
}

const CertificateDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState<ApiResponse | null>(null);

  useEffect(() => {
    const data = {
      "certificate": {
        "id": "1",
        "address": "0x123fdgdfgkdjfhgdklfjhjgkljdfhgdfh",
        "template": "1",
        "image": "https://i.imgur.com/ghQ5cZV.jpg",
        "metadata": "https://gateway.pinata.cloud/ipfs/QmXbZrR5X8y7h4j4QXq8Q7kYJr4X5Xk7HqjJ9k2J6X3h1R",
        "author": "abc123",
        "organization": "sfhgkjshg",
      },
      "certificateTemplate": {
        "id": "1",
        "name": "Certificate Template 1",
        "organizationId": "1",
        "background": "https://gateway.pinata.cloud/ipfs/QmXbZrR5X8y7h4j4QXq8Q7kYJr4X5Xk7HqjJ9k2J6X3h1R",
        "height": 500,
        "width": 700,
        "attributes": "name,address",
        "demo": "https://gateway.pinata.cloud/ipfs/QmXbZrR5X8y7h4j4QXq8Q7kYJr4X5Xk7HqjJ9k2J6X3h1R",
        "public": true
      },
      "studentCertificate": {
        "id": "1",
        "certificate_id": "1",
        "address": "0x123dfoihjodifjhiodfjohijdofihojijdfho",
        "name": "Student 1",
        "metadata": "{\"abc\":\"abc\", \"def\":\"def\", \"ghi\":\"ghi\"}"
      }
    };
    if (id) {
      setData(data);
    }
  }, [id]);

  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
    <div className="flex shadow-lg rounded-lg overflow-hidden">
        <div className="w-1/2">
            <img src={data.certificate.image} alt="Certificate" className="object-cover w-full h-full" />
        </div>
        <div className="w-1/2 p-8 bg-white">
            <p className="text-lg mb-1">
                <span className="font-semibold">Organization:</span> 
                <a className="text-blue-500 hover:underline"> dfgdfgdfgdfg</a>
            </p>
            <p className="text-lg mb-1">
                <span className="font-semibold">Author:</span> 

                <a className="text-blue-500 hover:underline"> {data.certificate.author} </a>
            </p>
            <p className="text-lg mb-1 cursor-pointer" onClick={() => navigator.clipboard.writeText(data.studentCertificate.address)}>
                <span className="font-semibold">Collection Address:</span> 
                <a className="text-blue-500 hover:underline"> {data.certificate.address}</a>
            </p>
            <p className="text-lg mb-1 cursor-pointer" onClick={() => navigator.clipboard.writeText(data.studentCertificate.address)}>
                <span className="font-semibold">Address:</span>
                <a className="text-blue-500 hover:underline"> {data.studentCertificate.address}</a>
            </p>
            <h2 className="text-xl font-bold mt-4 mb-2">Metadata</h2>
            <pre className="text-gray-500"><code>{JSON.stringify(data.studentCertificate.metadata, null, 2)}</code></pre>
            <h2 className="text-xl font-bold mt-4 mb-2">Description</h2>
            <p className="text-gray-500"> dfghfghjfghjđghjsgkjhshgksjdhgjkhsdkgjhskjdhg </p>
        </div>
    </div>
</div>

  );
};

export default CertificateDetail;