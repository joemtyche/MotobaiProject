import { useState, useEffect } from "react";
import { ACCESS_TOKEN } from "../../constants";

// needs loading and error handling to pass

export function useFetchData(info) {
  const [data, setData] = useState([]);
  const [refreshData, setRefreshData] = useState(false);
  const token = localStorage.getItem(ACCESS_TOKEN);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const url = `http://127.0.0.1:8000/api/${info}/list`;
        const formattedUrl = url.endsWith("/") ? url : `${url}/`;

        const response = await fetch(formattedUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch ${info}s`);
        }
        const dataThings = await response.json();
        const filteredData = dataThings.filter((item) => !item.is_deleted);
        setData(filteredData);
        console.log(filteredData);
      } catch (error) {
        console.error(`Error fetching ${info}s:`, error);
      }
    };

    fetchInfo();
  }, [info, token, refreshData]);

  const triggerRefresh = () => setRefreshData((prev) => !prev);

  return { data, triggerRefresh };
}
