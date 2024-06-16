import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchData = (url, initialLimit) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(initialLimit);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(url, { params: { limit } });
        setData(response.data.data);
        setLimit(response.data.total); // Set limit dynamically
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, limit]);

  return { data, loading, error, limit, setLimit };
};

export default useFetchData;
