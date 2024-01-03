import { NEXT_PUBLIC_BACKEND_URL } from '@/config/env';
import axios from 'axios';
import { getSession, signOut } from 'next-auth/react';
export interface fetchClientProps {
  method?: string;
  endpoint: string;
  body?: any;
  token?: string;
}

async function fetchClient({ method = 'GET', endpoint, body, token = "" }: fetchClientProps) {
  try {
    const session: any = await getSession();
    const accessToken = token || session?.user?.accessToken;
    const axiosConfig = {
      method: method,
      url: NEXT_PUBLIC_BACKEND_URL + endpoint.toString(),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `bearer ${accessToken}`,
      },
      data: body || undefined,
    };

    const response = await axios(axiosConfig);

    if (!response.status || response.status < 200 || response.status > 300) {
      throw response;
    }

    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorResponse = error.response;

      if (errorResponse.status === 401) {
        signOut();
      }

      throw errorResponse;
    }

    throw new Error('Failed to fetch data', { cause: error });
  }
}

export default fetchClient;