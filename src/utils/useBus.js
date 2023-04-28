import useSWR from "swr";

import { useState } from "react";
function useBus(postcode) {
  const [hasRun, setHasRun] = useState(false);

  const busFetcher = async () => {
    if (postcode.length === 0) {
      return [];
    }
    try {
      const res = await fetch(`/bus/${postcode}`);
      const data = await res.json();
      setHasRun(true);
      return data.response;
    } catch (e) {
      throw new Error("Invalid Postcode");
    }
  };

  const { data, error, isLoading } = useSWR(`/bus/${postcode}`, busFetcher, {
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
