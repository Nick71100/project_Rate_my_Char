import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  multipleStatements: process.env.DB_MULTIPLESTATEMENTS === "true",
});

try {
  const connection = await db.getConnection();
  console.log(
    "Connexion à la base de données réussie !",
    connection.config.database
  );
  connection.release();
} catch (error) {
  console.error("Erreur de connexion à la base de données :", error.message);
  process.exit(1);
}

export default db;
