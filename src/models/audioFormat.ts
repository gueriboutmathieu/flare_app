export type AudioFormat = {
    id: string;
    formatId: string;
    url: string;
    codec: string;
    abr: number;
}

export function createAudioFormat(
    id: string,
    formatId: string,
    url: string,
    codec: string,
    abr: number,
): AudioFormat {
    const audioFormat: AudioFormat = {
        id,
        formatId,
        url,
        codec,
        abr,
    }
    return Object.freeze(audioFormat);
}
