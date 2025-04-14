<template>
    <div class="w-full h-full flex items-center justify-center relative">
        <div
            @mouseenter="toggleControls(true)" @mouseleave="toggleControls(false)"
            class="relative flex items-center justify-center"
        >
            <video
                ref="videoRef"
                :poster="posterUrl"
                class="max-w-full max-h-full bg-black flex flex-grow"
                autoplay
            />

            <Transition name="fade">
                <div
                    v-show="showControls"
                    class="absolute bottom-0 left-0 right-0 h-10 flex flex-row items-center bg-dark/25 backdrop-blur-md px-5 gap-5"
                >
                    <button @click="togglePlayPause">play pause</button>
                    <div class="flex flex-row gap-1">
                        <span>{{ formatDuration(currentTime) }}</span>
                        <span> | </span>
                        <span>{{ formatDuration(duration) }}</span>
                    </div>
                    <input type="range" min="0" :max="duration" :value="currentTime" @change="seek" class="flex flex-grow" />
                    <button @click="toggleFullScreen">plein ecran</button>
                </div>
            </Transition>
        </div>
    </div>
</template>

<script setup lang="ts">
import { formatDuration } from "@/utils/formatDuration";

const props = defineProps<{
    url: string;
    duration: number;
    startAt: number;
    posterUrl: string;
}>();
const emits = defineEmits<{ seek: [number] }>();

const posterUrl: string = props.posterUrl;
const url: string = props.url;
const duration: number = props.duration;
const startAt = ref<number>(props.startAt);
const currentTime = ref<number>(0);
const videoRef = ref<HTMLVideoElement | null>();
const showControls = ref<boolean>(false);

const height = ref<number>(0);
const width = ref<number>(0);

onMounted(async () => {
    if (videoRef.value === null) {
        await nextTick();
    }

    height.value = screen.height;
    width.value = screen.width;

    await play();
});

onBeforeUnmount(() => {
    const video = videoRef.value as HTMLVideoElement;
    video.pause();
    video.removeAttribute("src");
    video.load();
});

async function play() {
    const video = videoRef.value as HTMLVideoElement;

    video.pause();
    video.src = url;

    video.addEventListener("loadedmetadata", () => {
        Object.defineProperty(video, "duration", {
            get: () => duration,
            configurable: true,
        });
        video.play();
    }, { once: true });

    video.load();
}

function seek(event: Event) {
    const time = parseFloat((event.target as HTMLInputElement).value);
    emits("seek", time);
}

function togglePlayPause(): void {
    const video = videoRef.value as HTMLVideoElement;
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function toggleControls(show: boolean): void {
    showControls.value = show;
}

function toggleFullScreen(): void {
    const video = videoRef.value!.parentElement as HTMLElement;
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        video.requestFullscreen();
    }
}

watchEffect(() => {
    if (videoRef.value) {
        const updateTime = () => {
            currentTime.value = startAt.value + (videoRef.value?.currentTime ?? 0);
        };
        videoRef.value.addEventListener("timeupdate", updateTime);
    }
});
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from, .fade-leave-to {
    opacity: 0;
}
</style>
