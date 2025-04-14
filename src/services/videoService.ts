import { type AudioFormat, createAudioFormat } from "@/models/audioFormat";
import { type Video, createVideo } from "@/models/video";
import { type VideoFormat, createVideoFormat } from "@/models/videoFormat";
import { type ApiService, RequestMethod } from "@/services/apiService";

export type VideoService = {
    search: (query: string) => Promise<Video[]>;
    getVideoWithFormats: (videoId: string) => Promise<Video>;
};

export function createVideoService(apiService: ApiService): VideoService {
    const search = async (query: string): Promise<Video[]> => {
        const response = await apiService.request(RequestMethod.POST, "/videos/search", true, { "query": query }, {});
        const searchResults = await response.json();
        const videos: Video[] = [];
        for (const searchResult of searchResults) {
            videos.push(createVideo(
                searchResult.id,
                searchResult.title,
                searchResult.url,
                searchResult.channel_id,
                searchResult.channel_title,
                searchResult.thumbnail_url,
                searchResult.duration,
                searchResult.view_count,
                searchResult.upload_date ? new Date(searchResult.upload_date) : null,
                searchResult.audio_formats,
                searchResult.video_formats,
            ));
        }
        return videos;
    };

    const getVideoWithFormats = async (videoId: string): Promise<Video> => {
        const response = await apiService.request(RequestMethod.GET, `/videos/${videoId}/with-formats`, true, {}, {});
        const video = await response.json();
        const audioFormats: AudioFormat[] = video.audio_formats.map((format: any) => {
            return createAudioFormat(format.id, format.format_id, format.url, format.codec, format.abr);
        });
        const videoFormats: VideoFormat[] = video.video_formats.map((format: any) => {
            return createVideoFormat(format.id, format.format_id, format.url, format.codec, format.height, format.width, format.fps);
        });
        return createVideo(
            video.id,
            video.title,
            video.url,
            video.channelId,
            video.channelTitle,
            video.thumbnailUrl,
            video.duration,
            video.viewCount,
            video.uploadDate,
            audioFormats,
            videoFormats,
        );
    }

    return { search, getVideoWithFormats };
}
