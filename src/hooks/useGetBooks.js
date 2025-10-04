import { useQuery } from "@tanstack/react-query";
import { httpClient } from "../core/http/http";

export const useGetBooks = () => {
    return useQuery({
        queryKey: ["books"],
        queryFn: async () => {
            try {
                const { data } = await httpClient.get('books');
                return data;
            } catch (error) {
                throw new Error('Failed to fetch users')
            }

        },
    });
};