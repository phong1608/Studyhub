import { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

const useApi = <T>(url: string,option?:AxiosRequestConfig) => {
    const [data, setData] = useState<T|null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const apiURL = process.env.API_URL||'http://localhost:3333'
    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${apiURL}/${url}`,option);
            setData(response.data);
        } catch (error) {
            setError((error as Error).message);
        } finally {
            setLoading(false);
        }
    }
    useEffect(()=>{
        fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return { data, loading, error };
};

export default useApi;