import { createClient, RedisClientType } from 'redis';

let redis: RedisClientType | null = null;

export async function getRedisClient(): Promise<RedisClientType> {
  if (!redis) {
    console.log('reinitializing client connection to redis');

    redis = createClient({
      url: process.env.REDIS_URL,
    });
    
    await redis.connect();
  }
  return redis;
}