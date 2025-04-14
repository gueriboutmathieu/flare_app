export function isCodecSupported(videoCodec: string): boolean {
    const video = document.createElement("video");
    return !!video.canPlayType(`video/webm; codecs=${videoCodec},opus`);
}