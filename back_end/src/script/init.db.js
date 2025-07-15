import fs from "fs";
import db from "../config/db.js";
import dotenv from "dotenv";

dotenv.config();

//IIFE Immediately Invoked Function Expression

(async () => {
  try {
    const initSQL = fs.readFileSync("./src/sql/init.sql", "utf8");

    await db.query(initSQL);

    console.log("Base de données initialisée correctement ✔");
  } catch (err) {
    console.error("Erreur lors de l'initialisation :", err.message);
  } finally {
    await db.end();
  }
})();
