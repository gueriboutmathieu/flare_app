import { type Video } from "@/models/video";

export type Stream = {
    video: Video;
    startAt: number;
    url: string;
    container: string;
    audioUrl: string;
    videoUrl: string;
}

export function createStream(
    video: Video,
    startAt: number,
    url: string,
    container: string,
    audioUrl: string,
    videoUrl: string,
): Stream {
    const stream: Stream = {
        video,
        startAt,
        url,
        container,
        audioUrl,
        videoUrl,
    }
    return Object.freeze(stream);
}
