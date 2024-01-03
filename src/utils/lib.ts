import fetchClient from "./fetch-client";

export async function getCertificateTemplate(endpoint: string) {
    return await fetchClient({
        method: "GET",
        endpoint: endpoint
    });
}