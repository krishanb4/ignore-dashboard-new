import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

interface ApiResponse {
  [key: string]: any;
}

interface UseAxiosResponse<T> {
  response: T | null;
  loading: boolean;
  error: string;
}

const useAxios = <T extends ApiResponse>(
  param: string
): UseAxiosResponse<T> => {
  const [response, setResponse] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  axios.defaults.baseURL = "https://api.coingecko.com/api/v3";

  const fetchData = async (param: string): Promise<void> => {
    try {
      setLoading(true);
      const result: AxiosResponse<T> = await axios.get<T>(param);
      setResponse(result.data);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(param).catch((err) => console.log("some"));
  }, [param]);

  return {
    response,
    loading,
    error,
  };
};

export default useAxios;
