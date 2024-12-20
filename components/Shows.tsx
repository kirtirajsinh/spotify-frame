"use client";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
type Show = {
  items: {
    audio_preview_url: string;
    description: string;
    duration_ms: number;
    explicit: boolean;
    external_urls: {
      spotify: string;
    };
    href: string;
    html_description: string;
    id: string;
    images: { url: string }[];
    name: string;
    release_date: string;
    type: string;
    uri: string;
  }[];
  limit: number;
  next: string;
  offset: number;
  total: number;
};

const Shows = ({ shows }: { shows: Show }) => {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
          Latest Episodes
        </h1>

        <div className="space-y-4">
          {shows?.items?.map(
            (episode) =>
              episode && (
                <div
                  key={episode.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all hover:shadow-lg"
                  onClick={() => router.push(`/episode/${episode.id}`)}
                >
                  <div className="flex flex-col md:flex-row gap-4">
                    {episode.images?.[0] && (
                      <div className="w-full md:w-48 h-48 flex-shrink-0">
                        <Image
                          src={episode.images[0].url}
                          alt={episode.name}
                          className="w-full h-full object-cover rounded-md"
                          width={192}
                          height={192}
                        />
                      </div>
                    )}

                    <div className="flex-1 space-y-3">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {episode.name}
                      </h2>

                      <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                        {episode.description}
                      </p>

                      <div className="flex flex-wrap gap-4 items-center text-sm">
                        <span className="text-gray-500 dark:text-gray-400">
                          {new Date(episode.release_date).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400">
                          {Math.floor(episode.duration_ms / 60000)} minutes
                        </span>
                      </div>

                      {/* Audio Player */}
                      {episode.audio_preview_url && (
                        <div className="pt-4">
                          <audio controls className="w-full">
                            <source
                              src={episode.audio_preview_url}
                              type="audio/mpeg"
                            />
                            Your browser does not support the audio element.
                          </audio>
                        </div>
                      )}

                      <div className="pt-4">
                        <a
                          href={episode.external_urls.spotify}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full text-sm transition-colors"
                        >
                          Listen on Spotify
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default Shows;
