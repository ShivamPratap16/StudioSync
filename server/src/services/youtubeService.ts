import { google } from 'googleapis';

const youtube = google.youtube('v3');

export const youtubeService = {
    searchVideos: async (query: string, maxResults: number = 5) => {
        const response = await youtube.search.list({
            part: 'snippet',
            q: query,
            maxResults: maxResults,
            type: 'video',
            key: process.env.YOUTUBE_API_KEY,
        });
        return response.data.items;
    },

    getVideoDetails: async (videoId: string) => {
        const response = await youtube.videos.list({
            part: 'snippet,contentDetails,statistics',
            id: videoId,
            key: process.env.YOUTUBE_API_KEY,
        });
        return response.data.items[0];
    },

    getChannelVideos: async (channelId: string, maxResults: number = 5) => {
        const response = await youtube.search.list({
            part: 'snippet',
            channelId: channelId,
            maxResults: maxResults,
            type: 'video',
            key: process.env.YOUTUBE_API_KEY,
        });
        return response.data.items;
    },
};