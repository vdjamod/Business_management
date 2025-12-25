// import { createClient } from "redis";

// const client = createClient({
//   username: "default",
//   password: "oWSwNB99XxsXWqJquC8ym4ezsZRNkTyc",
//   socket: {
//     host: "redis-17218.c57.us-east-1-4.ec2.redns.redis-cloud.com",
//     port: 17218,
//   },
// });

// const connectRedis = async () => {
//   await client.connect();
//   console.log("Redis connected successfully!");
// };

// client.on("error", (error) => {
//   console.error("Redis Client Error:", error);
// });

// export { client, connectRedis };


import { createClient } from 'redis';

const client = createClient({
    username: 'default',
    password: 'lnF5dk86VCcgh28fL5jlbIElKd3Tl4EG',
    socket: {
        host: 'redis-18372.c212.ap-south-1-1.ec2.cloud.redislabs.com',
        port: 18372
    }
});

client.on('error', err => console.log('Redis Client Error', err));

const connectRedis = async () => {
  await client.connect();
  console.log("Redis connected successfully!");
};

export { client, connectRedis };