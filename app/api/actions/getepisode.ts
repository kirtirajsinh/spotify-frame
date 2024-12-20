export const getEpisode = async (episodeid: string, access_token: string) => {

    const url = `https://api.spotify.com/v1/episodes/${episodeid}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${access_token}`, // Replace with your valid token
        },
    });

    if (!response.ok) {
        throw new Error(`Error fetching episodes: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
}