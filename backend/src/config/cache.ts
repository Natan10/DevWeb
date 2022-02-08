import Redis from "ioredis";

const redis = new Redis({
  host: "localhost",
  port: 6380,
});

const getKey = async (key: string) => {
  const existKey = await redis.exists(key);
  if (existKey) {
    return await redis.get(key);
  }
  return null;
};

const setKey = async (key: string, value: any, timeExp = 60 * 15) => {
  return await redis.set(key, JSON.stringify(value), "EX", timeExp);
};

export { redis, getKey, setKey };
