<template>
    <div class="h-full w-full flex items-center justify-center">
        <VideoPlayer
            :url="stream.url"
            :duration="stream.video.duration"
            :startAt="stream.startAt"
            :poster="stream.video.thumbnailUrl"
            @seek="seek"
        />
    </div>
</template>

<script setup lang="ts">
definePageMeta({ path: "/stream", middleware: "auth" });

import { type Stream } from "@/models/stream";
import { type StreamStore } from "@/stores/streamStore";

const streamStore = useNuxtApp().$streamStore as StreamStore;

const stream = computed(() => streamStore.state.stream as Stream);

async function seek(time: number) {
    await streamStore.setStream(stream.value.video, time);
}
</script>
