import Image from "next/image";
import React from "react";

export interface SpotifyImage {
  url: string;
  height: number;
  width: number;
}

export interface SpotifyExternalUrls {
  spotify: string;
}

export interface SpotifyShow {
  name: string;
  publisher: string;
  external_urls: SpotifyExternalUrls;
}

export interface SpotifyEpisode {
  images: SpotifyImage[];
  name: string;
  show: SpotifyShow;
  audio_preview_url: string;
  description: string;
  external_urls: SpotifyExternalUrls;
}

const Episode = ({ episode }: { episode: SpotifyEpisode }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-white">
      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Episode Image */}
        <div className="relative aspect-square w-full max-w-[320px] mx-auto">
          <Image
            src={episode.images[0].url}
            alt={episode.name}
            fill
            className="rounded-2xl shadow-lg object-cover"
            priority
          />
        </div>

        {/* Episode Info Section */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-gray-800 leading-tight">
            {episode.name}
          </h1>

          <div className="flex items-center space-x-2">
            <div className="flex-1">
              <a
                href={episode.show.external_urls.spotify}
                className="text-sm font-medium text-purple-600"
              >
                {episode.show.name}
              </a>
              <p className="text-sm text-gray-600">{episode.show.publisher}</p>
            </div>
          </div>

          {/* Audio Player */}
          <div className="bg-white rounded-xl p-4 shadow-md">
            <audio
              controls
              src={episode.audio_preview_url}
              className="w-full h-12"
            >
              Your browser does not support the audio element.
            </audio>
          </div>

          {/* Description */}
          <div className="bg-white rounded-xl p-4 shadow-md">
            <h2 className="font-semibold text-gray-800 mb-2">
              About this episode
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
              {episode.description}
            </p>
          </div>

          {/* Spotify Button */}
          <a
            href={episode.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-[#1DB954] text-white text-center py-4 rounded-full font-bold shadow-md hover:bg-[#1ed760] transition-colors"
          >
            Open in Spotify
          </a>
        </div>
      </div>
    </div>
  );
};

export default Episode;
