<template>
    <div class="h-full w-full p-10">
        <div class="flex flex-row gap-10 items-center justify-start">
            <span class="self-center text-4xl">Rechercher</span>

            <input
                v-model="query"
                class="
                    w-96 h-10 p-5 rounded-full
                    bg-white text-dark text-lg placeholder-dark/2 border-none shadow-none outline-none 
                    focus:outline-4 focus:outline-green focus:outline-offset-0
                "
                placeholder="Never Gonna Give You Up..."
            >

            <button
                @click="search"
                class="
                    self-center w-fit h-10 px-10 rounded-full
                    bg-darkLight shadow-xl text-white text-lg
                    hover:bg-green hover:text-dark
                    active:bg-green/50
                    text-wrap
                "
            >
                Rechercher
            </button>
        </div>

        <div class="
            grid gap-10 py-10
            grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5
        "
        >
            <div
                v-for="video in videos"
                class="flex flex-col items-start p-2.5 shadow-3xl rounded-md hover:bg-darkLight hover:scale-110"
            >
                <div class="relative cursor-pointer" @click="stream(video.id)">
                    <img :src="video.thumbnailUrl" class="rounded-md" />
                    <span class="absolute bottom-1 right-1 bg-dark/75 backdrop-blur-md text-white p-1 rounded-md">{{ formatDuration(video.duration) }}</span>
                </div>
                <span class="text-lg pt-2.5 cursor-pointer">{{ video.title }}</span>
                <div class="flex flex-row gap-2 pt-1">
                    <span class="font-bold underline cursor-pointer" @click="console.log('channel clicked')">{{ video.channelTitle }}</span>
                    <span>•</span>
                    <span>{{ formatNumber(video.viewCount) }} vues</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({ path: "/", middleware: "auth" });

import type { Video } from "@/models/video";
import type { VideoService } from "@/services/videoService";
import type { StreamStore } from "@/stores/streamStore";
import { formatDuration } from "@/utils/formatDuration";
import { formatNumber } from "@/utils/formatNumber";
import { isCodecSupported } from "@/utils/isCodecSupported";
import { getSupportedVideoFormats } from "@/utils/getSupportedVideoFormats";

const videoService = useNuxtApp().$videoService as VideoService;
const streamStore = useNuxtApp().$streamStore as StreamStore;

const query = ref<string>("");
const videos = ref<Video[]>([]);

onMounted(async () => {
    query.value = "antoine daniel les vod";
    await search();
});

async function search(): Promise<void> {
    const searchResults = await videoService.search(query.value);
    videos.value = searchResults;
}

async function stream(videoId: string): Promise<void> {
    const video = await videoService.getVideoWithFormats(videoId);
    console.log(video.thumbnailUrl)
    const supportedFormats = getSupportedVideoFormats(video);
    const container = supportedFormats[0];
    const audioUrl = supportedFormats[1].url;
    const videoUrl = supportedFormats[2][supportedFormats[2].length - 1].url;
    await streamStore.setStream(video, 0, container, audioUrl, videoUrl);
    navigateTo("/stream");
}
</script>
