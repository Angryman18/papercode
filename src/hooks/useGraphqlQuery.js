import graphqlQuery from "service/graphqlQuery";
import { useAccessToken } from "@nhost/react";
import { useState } from "react";

const useGraphqlQuery = () => {
  const accessToken = useAccessToken();
  const [loading, setLoaing] = useState(false);
  const request = async (query) => {
    setLoaing(true);
    const response = await graphqlQuery(query, accessToken)
      .catch((err) => Promise.reject(err))
      .finally(() => setLoaing(false));
    return response.data;
  };
  return [request, loading];
};

export default useGraphqlQuery;
