import database from "../../../../infra/database";

async function status(request, response) {
  const result = await database.query();
  response.status(200).json({ server: "OK", db_status: result.rows[0] });
}

export default status;
