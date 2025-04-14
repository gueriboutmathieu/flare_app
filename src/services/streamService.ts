import { type ApiService, RequestMethod } from "@/services/apiService";

export type StreamService = {
    getStreamUrl: (videoId: string, startAt: number) => string;
    endStream: (videoId: string) => Promise<void>;
};

export function createStreamService(apiService: ApiService): StreamService {
    const getStreamUrl = (videoId: string, startAt: number): string => {
        return apiService.buildRequestUrl(`/videos/${videoId}/stream`, {"start_at": startAt.toString()});
    };

    const endStream = async (videoId: string): Promise<void> => {
        await apiService.request(RequestMethod.POST, `/videos/${videoId}/end-stream`, true, {}, {});
    };

    return { getStreamUrl, endStream };
}
