'use server';
export const generateAccessToken = async () => {
    const credentials = Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64');

    try {

        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                Authorization: `Basic ${credentials}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({ grant_type: 'client_credentials' }).toString(),
        });

        const data = await response.json();
        console.log(data, "data from generated Access Token")
        return {
            access_token: data.access_token,
            expires_in: data.expires_in,
        };
    }
    catch (error) {
        console.error('Error generating access token:', error);
        return {
            accessToken: null,
            expiresIn: null,
        };
    }

}