import useSWR from 'swr';
import axios from 'axios';
import { NEXT_PUBLIC_SHYFT_API_KEY } from '@/config/env';

export interface fetchShyftProps {
    method?: string;
    endpoint: string;
    body?: any;
}

export const fetchShyft = async (shyftProps: fetchShyftProps) => {

    const axiosConfig = {
        method: shyftProps.method || 'GET',
        url: `https://api.shyft.to` + shyftProps.endpoint.toString(),
        headers: {
            "x-api-key": NEXT_PUBLIC_SHYFT_API_KEY,
        },
        data: shyftProps.body || undefined,
    };
    return await axios(axiosConfig);
}

const shyftFetcher = async (axiosConfig: any) => {
    return await axios(axiosConfig)
}

const useShyft = (shyftProps: fetchShyftProps) => {
    const axiosConfig = {
        method: shyftProps.method || 'GET',
        url: `https://api.shyft.to` + shyftProps.endpoint.toString(),
        headers: {
            "x-api-key": NEXT_PUBLIC_SHYFT_API_KEY,
        },
        data: shyftProps.body || undefined,
    };

    const { data, error, mutate } = useSWR(axiosConfig,shyftFetcher);
    return {
        data,
        error,
        mutate,
    };
};

export default useShyft;
