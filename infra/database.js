import { Client } from "pg";
async function query(q) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  });
  // const verceldB = new Client({
  //   connectionString: process.env.POSTGRES_URL + "?sslmode=require",
  // });
  await client.connect();
  try {
    const res = await client.query(q);
    console.log(res.rows[0]);
    return res;
  } catch (error) {
    console.error(error);
  } finally {
    await client.end();
  }
}

export default {
  query: query,
};
