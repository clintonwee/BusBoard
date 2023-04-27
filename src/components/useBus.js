import useSWR from "swr";
import axios from "axios";
import { useState } from "react";
function useBus(postcode) {
  const [hasRun, setHasRun] = useState(false);
  const [cache, setCache] = useState([]);
  const fetcher = async () => {
    console.log("I smell so bad lol");
    if (postcode.length === 0) {
      return [];
    }

    // const res = await axios.get(`/bus/${postcode}`);
    // setHasRun(true);
    // if (res.data) setCache(res.data.response);
    // return res.data.response;
    // }
    try {
      const res = await axios.get(`/bus/${postcode}`);
      setHasRun(true);
      setCache(res.data.response);
      return res.data.response;
    } catch (e) {
      throw new Error("Invalid Postcode");
    }
  };
  const { data, error, isLoading } = useSWR(`/bus/${postcode}`, fetcher, {
    fallbackData: [],
    refreshInterval: 10000,
  });

  return {
    buses: data,
    isLoading,
    error,
    hasRun: hasRun,
  };
}

export default useBus;
