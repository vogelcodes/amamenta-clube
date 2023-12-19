import database from "infra/database";

async function status(request, response) {
  const updatedAt = new Date();

  const databaseVersion = await database.query("SHOW server_version;");
  const databaseVersionValue = databaseVersion.rows[0].server_version;
  const databaseMaxConnectionsResult = await database.query(
    "SHOW max_connections;",
  );
  const databaseName = process.env.POSTGRES_DB;
  console.log(databaseName);
  const databaseOpenedConnectionsResult = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });
  const databaseMaxConnectionsValue =
    databaseMaxConnectionsResult.rows[0].max_connections;
  const databaseOpenedConnectionsValue =
    databaseOpenedConnectionsResult.rows[0].count;
  console.log(databaseOpenedConnectionsValue);
  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
        status: "healthy",
        max_connections: parseInt(databaseMaxConnectionsValue),
        opened_connections: parseInt(databaseOpenedConnectionsValue),
        latency: {
          first_query: 79.98018600000069,
          second_query: 57.97298900003079,
          third_query: 24.141489000059664,
        },
      },
      webserver: {
        status: "healthy",
        provider: "vercel",
        environment: "production",
        aws_region: "sa-east-1",
        vercel_region: "gru1",
        timezone: ":UTC",
        last_commit_author: "aprendendofelipe",
        last_commit_message:
          "Merge pull request #1572 from filipedeschamps/node-hydrogen-v18\n\nDowngrade do Node.js para `lts/hydrogen` (`v18`)",
        last_commit_message_sha: "4e4d030cd4c0c2e240c96e5cfea16e43604aa223",
        version: "v18.18.0",
      },
    },
  });
}

export default status;
