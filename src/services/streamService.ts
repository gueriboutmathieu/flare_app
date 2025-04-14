import { type ApiService, RequestMethod } from "@/services/apiService";

export type StreamService = {
    getStreamUrl: (
        videoId: string,
        startAt: number,
        container: string,
        audioUrl: string,
        videoUrl: string,
    ) => string;
    endStream: (videoId: string) => Promise<void>;
};

export function createStreamService(apiService: ApiService): StreamService {
    const getStreamUrl = (
        videoId: string,
        startAt: number,
        container: string,
        audioUrl: string,
        videoUrl: string
    ): string => {
        return apiService.buildRequestUrl(
            `/videos/${videoId}/stream`,
            {
                "start_at": startAt.toString(),
                "container": container,
                "audio_url": audioUrl,
                "video_url": videoUrl
            }
        );
    };

    const endStream = async (videoId: string): Promise<void> => {
        await apiService.request(RequestMethod.POST, `/videos/${videoId}/end-stream`, true, {}, {});
    };

    return { getStreamUrl, endStream };
}
