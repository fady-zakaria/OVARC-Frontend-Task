import { useQuery } from "@tanstack/react-query";
import { httpClient } from "../core/http/http";

export const useGetAuthors = () => {
    return useQuery({
        queryKey: ["authors"],
        queryFn: async () => {
            try {
                const { data } = await httpClient.get(`authors`);
                return data;
            } catch (error) {
                throw new Error('Failed to fetch users')
            }

        },
    });
};