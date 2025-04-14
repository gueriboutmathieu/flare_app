import type { AudioFormat } from "~/models/audioFormat";
import type { VideoFormat } from "~/models/videoFormat";
import { isCodecSupported } from "@/utils/isCodecSupported";
import type { Video } from "~/models/video";

export function getBestVideoFormats(video: Video): number[] {
    const audioAac = video.audioFormats.find(format => format.codec !== "opus");
    const audioOpus = video.audioFormats.find(format => format.codec === "opus");

    const screenHeight = screen.height;
    const availableFormatsForScreenHeight = video.videoFormats.map(format => {
        if (format.height === screenHeight) return format.height;
    });
    return [];
}