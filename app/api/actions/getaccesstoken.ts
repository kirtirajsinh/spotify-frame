'use server'
import { client } from '@/lib/redis';
import { generateAccessToken } from './generateaccesstoken';

// type AccessToken = {
//     access_token: string;
//     expires_in: number;
// }



export const getAccessToken = async () => {
    if (!client) {
        throw new Error("Redis client is not initialized");
    }

    if (!client.isOpen) {
        await client.connect();
    }


    console.log(client, "client")
    // let accessToken: AccessToken | null = null;

    const accessTokenData = await client.hGetAll('access_token');



    if (accessTokenData.access_token && accessTokenData.expires_in) {
        const currentTimeInSeconds = Math.floor(Date.now() / 1000);

        if (Number(accessTokenData.expires_in) > currentTimeInSeconds) {
            // Token is still valid

            console.log("Access token is still valid")
            await client.disconnect();
            return {
                accessToken: accessTokenData.access_token,
                expiresIn: Number(accessTokenData.expires_in)
            };
        }

        console.log("generating new access Token")

        // Token has expired, generate new one
        const accessToken = await generateAccessToken();
        accessToken.expires_in = Math.floor(Date.now() / 1000) + accessToken.expires_in;

        await client.hSet('access_token', {
            access_token: accessToken?.access_token,
            expires_in: accessToken?.expires_in,
        });

        await client.disconnect();
        return accessToken;
    }

    // await client.disconnect();
}




