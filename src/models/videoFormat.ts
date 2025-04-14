export type VideoFormat = {
    id: string;
    formatId: string;
    url: string;
    codec: string;
    height: number;
    width: number;
    fps: number;
}

export function createVideoFormat(
    id: string,
    formatId: string,
    url: string,
    codec: string,
    height: number,
    width: number,
    fps: number,
): VideoFormat {
    const audioFormat: VideoFormat = {
        id,
        formatId,
        url,
        codec,
        height,
        width,
        fps,
    }
    return Object.freeze(audioFormat);
}
