import { type ApiService, createApiService } from "@/services/apiService";
import { type StreamService, createStreamService } from "~/services/streamService";
import { type VideoService, createVideoService } from "~/services/videoService";
import { type StreamStore, createStreamStore } from "@/stores/streamStore";
import { type UserStore, createUserStore } from "@/stores/userStore";

export default defineNuxtPlugin((nuxtApp) => {
    const runtimeConfig = useRuntimeConfig();

    const apiService: ApiService = createApiService(runtimeConfig.public.api.baseUrl);
    apiService.init();
    const streamService: StreamService = createStreamService(apiService);
    const videoService: VideoService = createVideoService(apiService);

    nuxtApp.provide("apiService", apiService);
    nuxtApp.provide("streamService", streamService);
    nuxtApp.provide("videoService", videoService);

    const streamStore: StreamStore = createStreamStore();
    const userStore: UserStore = createUserStore();

    nuxtApp.provide("streamStore", streamStore);
    nuxtApp.provide("userStore", userStore);
});
