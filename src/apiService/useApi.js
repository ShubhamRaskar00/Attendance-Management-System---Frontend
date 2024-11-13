import { useState } from "react";
import apiService from "./apiService";

// common api method
const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const callApi = async (method, url, payload = null) => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiService[method](url, payload);
      setData(response);
      return response;
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading, error, data, callApi
  }
};

export default useApi