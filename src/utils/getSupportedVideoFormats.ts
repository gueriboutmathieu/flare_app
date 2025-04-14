import { isCodecSupported } from "@/utils/isCodecSupported";
import type { AudioFormat } from "~/models/audioFormat";
import type { Video } from "~/models/video";
import type { VideoFormat } from "~/models/videoFormat";

export function getSupportedVideoFormats(video: Video): [string, AudioFormat, VideoFormat[]] {
    const aacFormat = video.audioFormats.find(format => format.codec !== "opus");
    const opusFormat = video.audioFormats.find(format => format.codec === "opus");
    const avc1Formats = video.videoFormats.filter(format => format.codec.startsWith("avc1"));
    const av01Formats = video.videoFormats.filter(format => format.codec.startsWith("av01"));
    const vp9Formats = video.videoFormats.filter(format => format.codec === "vp9");

    if (isCodecSupported(av01Formats[av01Formats.length - 1].codec)) {
        return ["webm", opusFormat!, av01Formats];
    }
    else if (isCodecSupported("vp9")) {
        return ["webm", opusFormat!, vp9Formats];
    }
    else {
        return ["mp4", aacFormat!, avc1Formats];
    }
}