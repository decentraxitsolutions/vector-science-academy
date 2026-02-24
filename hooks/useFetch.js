'use client';

import { useState, useCallback } from 'react';

export function useFetch(action) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await action(...args);
      setData(result);
      return result;
    } catch (err) {
      setError(err.message || "An error occurred");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [action]);

  return { data, isLoading, error, execute };
}