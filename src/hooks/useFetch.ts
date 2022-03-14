import { useState, useEffect } from "react";
import axios from "axios";

const useFetchGet = (resource: string) => {
  
  const API_URL = process.env.BASE_URL

  const [isLoading, setIsLoading] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [serverError, setServerError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const resp = await axios.get(API_URL + resource);
        const data = await resp?.data;

        setApiData(data);
        setIsLoading(false);
      } catch (error: any) {
        setServerError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [resource]);

  return { isLoading, apiData, serverError };
};

export default useFetchGet