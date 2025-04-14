export type AudioFormat = {
    id: string;
    url: string;
    codec: string;
    abr: number;
}

export function createAudioFormat(
    id: string,
    url: string,
    codec: string,
    abr: number,
): AudioFormat {
    const audioFormat: AudioFormat = {
        id,
        url,
        codec,
        abr,
    }
    return Object.freeze(audioFormat);
}
