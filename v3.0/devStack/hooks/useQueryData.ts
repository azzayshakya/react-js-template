import { useQueryClient } from "@tanstack/react-query";

/**
 * Custom hook to retrieve query data (single or all records) from the query client.
 * 
 * @template QueryDataType The type of data returned by the query.
 * @param {string[]} queryKey The key used to identify the query.
 * @param {string} [id] The id of the record to retrieve. Optional.
 * @returns {QueryDataType | QueryDataType[] | undefined} The query data.
 */
export const useQueryData = <QueryDataType extends { id?: string }>(
  queryKey: string[],
  id?: string
): QueryDataType | QueryDataType[] | undefined => {
  // Get query client
  const queryClient = useQueryClient();

  // Get query data from query client
  const queryData = queryClient.getQueryData<QueryDataType[]>(queryKey);

  // Return single record if id is provided, else return all records
  return id ? queryData?.find((item) => item.id === id) : queryData;
};
