import fetchClient from "@/utils/fetch-client";
import produce from "immer";
import { create } from "zustand";

interface UserState {
    userInfo: any;
    setUserInfo: (user: any) => void;
    fetchData: (token: any) => void;
}

export const userStore = create<UserState>((set) => ({
    userInfo: null,
    setUserInfo: (user: any): void => set({ userInfo: user }),
    fetchData: async () => {
        try {
            const response = await fetchClient({
                method: "GET",
                endpoint: `/user/profile`,
            });
            set({ userInfo: response.data.data });
        } catch (error) {
            set({ userInfo: null });
        }
    },
}));