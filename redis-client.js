const redis = require("redis");
const util = require("util");

const REDIS_URL = "kpu-stkip.redis.cache.windows.net";
const REDIS_PASSWORD = "fXU98qnKBlLSHRQ7T+aXhLIWgP7P4AhJNQP5LjJwcXQ=";
const REDIS_POST = 6380;

const client = redis.createClient(REDIS_POST, REDIS_URL, {
  auth_pass: REDIS_PASSWORD,
  tls: { servername: REDIS_URL },
});

client.set = util.promisify(client.set);
client.get = util.promisify(client.get);

module.exports = client;
