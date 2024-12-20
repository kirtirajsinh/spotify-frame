import { createClient } from 'redis';

let client: ReturnType<typeof createClient> | undefined;

if (!client) {
    client = createClient({
        username: 'default',
        password: process.env.REDIS_PASSWORD ?? '',
        socket: {
            host: process.env.REDIS_HOST ?? '',
            port: parseInt(process.env.REDIS_PORT ?? '0'),
        },
    });

    client.on('error', (error) => {
        console.error(`Redis client error:`, error);
    });

    // Only connect once
    if (!client.isOpen) {
        client.connect().catch((err) => console.error("Failed to connect to Redis:", err));
    }
}

export { client };
