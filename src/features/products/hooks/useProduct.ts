import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../api/productApi";

export function useProduct(id: string | undefined) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id!),
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 5,
  });
}
