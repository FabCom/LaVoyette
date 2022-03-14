import { useState } from "react";
import axios from "axios";
import { API_URL } from "../config";


const useRequest = (method, resource) => {
  const URL = `${API_URL}/${resource}`
  const [isLoading, setIsLoading] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [serverError, setServerError] = useState(false);

  const doFetch = async (body = null) => {
    setIsLoading(true);
    setServerError(false);
    try {
      const resp = await axios({
        method: method,
        headers: { "Content-Type": "application/json" },
        url: URL,
        data: body
      });
      const data = await resp?.data;

      setApiData(data);
    } catch (error) {
      setServerError(true);
    } finally {
      setIsLoading(false);
    }
  };


  return { isLoading, doFetch, serverError, apiData };
};

export default useRequest