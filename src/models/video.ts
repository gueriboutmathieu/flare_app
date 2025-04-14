import type { AudioFormat } from "@/models/audioFormat";
import type { VideoFormat } from "@/models/videoFormat";

export type Video = {
    id: string;
    title: string
    url: string
    channelId: string;
    channelTitle: string;
    thumbnailUrl: string;
    duration: number;
    viewCount: number;
    uploadDate: Date | null;
    audioFormats: AudioFormat[];
    videoFormats: VideoFormat[];
};

export function createVideo(
    id: string,
    title: string,
    url: string,
    channelId: string,
    channelTitle: string,
    thumbnailUrl: string,
    duration: number,
    viewCount: number,
    uploadDate: Date | null,
    audioFormats: AudioFormat[],
    videoFormats: VideoFormat[],
): Video {
    const video: Video = {
        id,
        title,
        url,
        channelId,
        channelTitle,
        thumbnailUrl,
        duration,
        viewCount,
        uploadDate,
        audioFormats,
        videoFormats,
    };
    return Object.freeze(video);
};
