import { type Video } from "@/models/video";

export type Stream = {
    video: Video;
    startAt: number;
    url: string;
}

export function createStream(video: Video, startAt: number, url: string): Stream {
    const stream: Stream = {
        video,
        startAt,
        url,
    }
    return Object.freeze(stream);
}
