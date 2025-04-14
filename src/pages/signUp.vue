<template>
    <div class="h-full w-full flex items-center justify-center">
        <div class="flex flex-col gap-10">
            <span class="self-center text-4xl">Créer un compte</span>

            <div class="flex flex-col gap-2">
                <label class="text-xl text-white">Clé publique</label>
                <input
                    v-model="publicKey"
                    class="
                        w-96 h-10 p-5 rounded-full
                        bg-white text-dark text-lg placeholder-dark/2 border-none shadow-none outline-none 
                        focus:outline-4 focus:outline-green focus:outline-offset-0
                    "
                    placeholder="1A2B3C..."
                >
            </div>
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
                @click="signUp"
                class="
                    self-center w-fit h-10 px-10 rounded-full
                    bg-darkLight shadow-xl text-white text-lg
                    hover:bg-green hover:text-dark
                    active:bg-green/50
                "
            >
                Créer un compte
            </button>

            <span class="self-center text-red">{{ errorMessage }}</span>

            <div class="flex flex-col gap-2 text-center">
                <label class="text-xl">Vous avez déjà un compte ?</label>
                <button
                    @click="navigateTo('/auth/signin')"
                    class="
                        self-center w-fit h-10 px-10 rounded-full
                        bg-darkLight shadow-xl text-white text-lg
                        hover:bg-purple hover:text-dark
                        active:bg-purple/50
                        text-wrap
                    "
                >
                    Connectez-vous
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({ path: "/auth/signup", middleware: "redirect-if-authenticated" });

import { type ApiService, RequestMethod } from "@/services/apiService";
import type { UserStore } from "@/stores/userStore";
import { createUser, type User } from "@/models/user";

const nuxtApp = useNuxtApp();

const apiService = nuxtApp.$apiService as ApiService;
const userStore = nuxtApp.$userStore as UserStore;

const publicKey = ref("");
const username = ref("");
const password = ref("");
const errorMessage = ref("");
const onSignUp = ref(false);

async function signUp() {
    onSignUp.value = true;
    try {
        await apiService.signUp(publicKey.value, username.value, password.value);
    }
    catch (error) {
        onSignUp.value = false;
        errorMessage.value = (error as Error).message;
        return;
    }
    
    if(apiService.isAuthenticated()) {
        const response = await apiService.request(RequestMethod.GET, "/users/current", true, {}, {});
        const data = await response.json();
        const user = createUser(data.id, data.name);
        userStore.setUser(user);
        onSignUp.value = false;
        navigateTo("/");
    }
}

</script>
