import { Client } from "pg";

console.log("Connecting to database...");
const client = new Client({
  connectionString: process.env["DATABASE_URL"],
});
await client.connect();

const res = await client.query(`SELECT 1 as "abba"`);
console.log(res.rows);

client.end();
