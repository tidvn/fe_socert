import fetchClient from "./fetch-client";

export async function switchOrganization(organizationId: string) {
    console.log(organizationId);
    const id = parseInt(organizationId);
    return await fetchClient({
        method: "POST",
        endpoint: "/user/profile/state",
        body: { organizationId: id },
    });
}