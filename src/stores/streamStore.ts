import cloneDeep from "lodash.clonedeep";
import { defineStore } from "pinia";

import { type Stream, createStream } from "@/models/stream";
import { type Video } from "@/models/video";
import type { StreamService } from "@/services/streamService";

export const createStreamStore = defineStore("streamStore", () => {
    const streamService = useNuxtApp().$streamService as StreamService;

    const _state = reactive<{
        stream: Stream | null;
    }>({
        stream: null,
    });

    const state = computed((): typeof _state => {
        const stateCopy = cloneDeep(_state);
        return Object.freeze(stateCopy);
    });

    const setStream = async (
        video: Video,
        startAt: number,
        container: string,
        audioUrl: string,
        videoUrl: string
    ): Promise<void> => {
        if (_state.stream !== null) {
            await streamService.endStream(_state.stream.video.id);
        }
        const url = streamService.getStreamUrl(
            video.id,
            startAt,
            container,
            audioUrl,
            videoUrl,
        );
        const newStream = createStream(video, startAt, url, container, audioUrl, videoUrl);
        _state.stream = newStream;
    };

    return {
        state,
        setStream,
    };
});

export type StreamStore = ReturnType<typeof createStreamStore>;
