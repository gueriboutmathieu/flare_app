<template>
    <div class="h-full w-full flex items-center justify-center">
        <div class="flex flex-col gap-10">
            <span class="self-center text-4xl">Se connecter</span>

            <div class="flex flex-col gap-2">
                <label class="text-xl text-white">Nom d'utilisateur</label>
                <input
                    v-model="username"
                    class="
                        w-96 h-10 p-5 rounded-full
                        bg-white text-dark text-lg placeholder-dark/2 border-none shadow-none outline-none 
                        focus:outline-4 focus:outline-green focus:outline-offset-0
                    "
                    placeholder="Pierre..."
                >
            </div>
            <div class="flex flex-col gap-2">
                <label class="text-xl">Mot de passe</label>
                <input
                    v-model="password"
                    class="
                        w-96 h-10 p-5 rounded-full
                        bg-white text-dark text-lg placeholder-dark/2 border-none shadow-none outline-none 
                        focus:outline-4 focus:outline-green focus:outline-offset-0
                    "
                    placeholder="password123..."
                >
            </div>

            <button
                @click="signIn"
                class="
                    self-center w-fit h-10 px-10 rounded-full
                    bg-darkLight shadow-xl text-white text-lg
                    hover:bg-green hover:text-dark
                    active:bg-green/50
                "
            >
                Se connecter
            </button>

            <span class="self-center text-red">{{ errorMessage }}</span>

            <div class="flex flex-col gap-2 text-center">
                <label class="text-xl">Vous n'avez pas encore de compte ?</label>
                <button
                    @click="navigateTo('/auth/signup')"
                    class="
                        self-center w-fit h-10 px-10 rounded-full
                        bg-darkLight shadow-xl text-white text-lg
                        hover:bg-purple hover:text-dark
                        active:bg-purple/50
                        text-wrap
                    "
                >
                    Créez en un !
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({ path: "/auth/signin", middleware: "redirect-if-authenticated" });

import { type ApiService, RequestMethod } from "@/services/apiService";
import type { UserStore } from "@/stores/userStore";
import { createUser, type User } from "@/models/user";

const nuxtApp = useNuxtApp();

const apiService = nuxtApp.$apiService as ApiService;
const userStore = nuxtApp.$userStore as UserStore;

const username = ref("");
const password = ref("");
const errorMessage = ref("");
const onSignIn = ref(false);

async function signIn() {
    onSignIn.value = true;
    try {
        await apiService.signIn(username.value, password.value);
    }
    catch (error) {
        onSignIn.value = false;
        errorMessage.value = (error as Error).message;
        return;
    }
    
    if(apiService.isAuthenticated()) {
        const response = await apiService.request(RequestMethod.GET, "/users/current", true, {}, {});
        const data = await response.json();
        const user = createUser(data.id, data.name);
        userStore.setUser(user);
        onSignIn.value = false;
        navigateTo("/");
    }
}

</script>
