import useSWR from "swr";
import axios from "axios";
import { useState } from "react";
function useBus(postcode) {
  const [hasRun, setHasRun] = useState(false);
  const fetcher = async () => {
    if (postcode.length < 6) {
      return [];
    } else {
      const res = await axios.get(`/bus/${postcode}`);
      setHasRun(true);
      console.log(res);
      return res.data.response;
    }
  };
  const { data, error, isLoading } = useSWR(`/bus/${postcode}`, fetcher, {
    fallbackData: [],
    refreshInterval: 10000,
  });

  return {
    buses: data,
    isLoading,
    isError: error,
    hasRun: hasRun,
  };
}

export default useBus;
