import { useQuery } from "@tanstack/react-query";
import { httpClient } from "../core/http/http";

export const useGetInventory = (store_id) => {
    return useQuery({
        queryKey: ["inventory", store_id],
        queryFn: async () => {
            try {
                const { data } = await httpClient.get(`inventory`);
                const inventoryData = data.filter(
                    (item) => item?.store_id === store_id
                )
                if (!inventoryData?.length) return [];
                return inventoryData;
            } catch (error) {
                throw new Error('Failed to fetch users')
            }

        },
    });
};