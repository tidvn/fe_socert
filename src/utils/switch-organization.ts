import fetchClient from "./fetch-client";

export async function switchOrganization(organizationId: string) {
    return await fetchClient({
        method: "POST",
        endpoint: "/user/profile/state",
        body: { organizationId: organizationId },
    });
}