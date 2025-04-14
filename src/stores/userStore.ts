import cloneDeep from "lodash.clonedeep";
import { defineStore } from "pinia";

import type { User } from "@/models/user";

export const createUserStore = defineStore("userStore", () => {
    const _state = reactive<{
        user: User | null;
    }>({
        user: null,
    });

    const state = computed(function (): typeof _state {
        const stateCopy = cloneDeep(_state);
        return Object.freeze(stateCopy);
    });

    const setUser = (user: User): void => {
        _state.user = user;
    };

    return {
        state,
        setUser,
    };
});

export type UserStore = ReturnType<typeof createUserStore>;
