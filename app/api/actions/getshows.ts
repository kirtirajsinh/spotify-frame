'use server'
export const getShows = async (accessToken: string) => {

    const url = 'https://api.spotify.com/v1/shows/7msbH2I7i6ZXIam7RPEsVC/episodes?limit=50';

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`, // Replace with your valid token
        },
    });

    if (!response.ok) {
        throw new Error(`Error fetching episodes: ${response.statusText}`);
    }

    const data = await response.json();
    return data;


}