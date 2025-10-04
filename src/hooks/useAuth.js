import { useMutation } from "@tanstack/react-query";
import { httpClient } from "../core/http/http";

export const useSignIn = () => {
    return useMutation({
        queryKey: ["auth"],
        mutationFn: async (formData) => {
            try {
                const { data } = await httpClient.get('users');
                const user = data.find(
                    (u) => u?.email === formData?.email && u?.password === formData?.password
                )
                if (user) {
                    return user;
                } else {
                    throw new Error('Invalid username or password')
                }
            } catch (error) {
                throw new Error('Failed to fetch users')
            }

        },
    });
};