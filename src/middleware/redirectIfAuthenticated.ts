import type { ApiService } from "@/services/apiService";

export default defineNuxtRouteMiddleware(() => {
    const nuxtApp = useNuxtApp();
    const apiService = nuxtApp.$apiService as ApiService;
    if (apiService.isAuthenticated()) {
        return navigateTo("/");
    }
});
