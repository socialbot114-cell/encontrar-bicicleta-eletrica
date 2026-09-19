import axios, { AxiosError } from 'axios';
import type { Network, NetworkDetail } from '../types';

const API_URL = 'https://api.citybik.es/v2/networks';

const client = axios.create({
    timeout: 15000,
});

export class ApiError extends Error {
    statusCode?: number;
    constructor(message: string, statusCode?: number) {
        super(message);
        this.name = 'ApiError';
        this.statusCode = statusCode;
    }
}

function handleError(err: AxiosError, label: string): never {
    if (err.code === 'ECONNABORTED') {
        throw new ApiError(`${label} request timed out.`);
    }
    const status = err.response?.status;
    const msg = status ? `${label} failed (${status}).` : `${label} network error.`;
    throw new ApiError(msg, status);
}

export const fetchNetworks = async (): Promise<Network[]> => {
    try {
        const response = await client.get<{ networks: Network[] }>(API_URL);
        return response.data.networks;
    } catch (e) {
        handleError(e as AxiosError, 'Fetch networks');
    }
};

export const fetchNetworkDetails = async (id: string): Promise<NetworkDetail> => {
    try {
        const response = await client.get<{ network: NetworkDetail }>(`${API_URL}/${id}`);
        return response.data.network;
    } catch (e) {
        handleError(e as AxiosError, 'Fetch network details');
    }
};
