import { useState, useEffect } from 'react';
import axios from 'axios';

export const useAxios = ({ url, method, body = null, headers = null, call = true }) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [loading, setloading] = useState(true);

    const fetchData = () => {
        axios[method](url, JSON.parse(headers), JSON.parse(body))
            .then((res) => {
                setResponse(res.data);
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setloading(false);
            });
    };

    useEffect(() => {
        if ( call ) {
            fetchData();
        }
    }, [method, url, body, headers, call]);
    return { response, error, loading };
};