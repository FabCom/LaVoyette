import { useState } from "react";
import axios from "axios";
import { API_URL } from "../config";

export type RequestMethod = "GET" | "POST" | "DELETE" | "PUT" | "PATCH"

type BodyValue = string | number | boolean | string[] | number[] | null
export type Body =  Record<string, BodyValue | Record<string, BodyValue>[] >

const useRequest = <DataType>(resource: string, method: RequestMethod = "GET") => {

  const URL = `${API_URL}/${resource}`
  const [isLoading, setIsLoading] = useState(false);
  const [apiData, setApiData] = useState<DataType | null>(null);
  const [serverError, setServerError] = useState(false);

  const request = async (body?: Body) => {
    setIsLoading(true);
    setServerError(false);
    try {
      const resp = await axios({
        method: method,
        headers: { "Content-Type": "application/json" },
        url: URL,
        data: body
      });
      const data: DataType = await resp?.data;

      setApiData(data);
    } catch (error) {
      setServerError(true);
    } finally {
      setIsLoading(false);
    }
  };


  return { isLoading, request, serverError, apiData };
};

export default useRequest