import db from "../config/db.js";

class Users {
  static async create(pseudo, password, email, id_gender) {
    try {
      const result = await db.execute(
        "INSERT INTO users (pseudo, email, password, id_gender) VALUES (?, ?, ?, ?)",
        [pseudo, email, password, id_gender]
      );
      return result;
    } catch (error) {
      throw new Error(
        "Erreur lors de la creation de l'utilisateurs : " + error.message
      );
    }
  }

  static async getAll() {
    try {
      const [result] = await db.query("SELECT * FROM users");
      return result;
    } catch (error) {
      throw new Error(
        "Erreur lors de la récupération des utilisateurs : " + error.message
      );
    }
  }

  static async update(id, fieldsToUpdate) {
    try {
      const fields = [];
      const values = [];

      for (const [key, value] of Object.entries(fieldsToUpdate)) {
        if (value !== undefined) {
          fields.push(`${key} = ?`);
          values.push(value);
        }
      }

      if (fields.length === 0) {
        throw new Error("Aucune donnée à mettre à jour.");
      }

      const sql = `UPDATE users SET ${fields.join(", ")} WHERE id = ?`;
      values.push(id);

      const [result] = await db.execute(sql, values);
      return result;
    } catch (error) {
      throw new Error(
        "Erreur lors de la modification de l'utilisateur : " + error.message
      );
    }
  }

  static async delete(id) {
    try {
      const [result] = await db.execute("DELETE FROM users WHERE id = ?", [id]);
      return result;
    } catch (error) {
      throw new Error(
        "Erreur lors de la suppression de l'utilisateurs : " + error.message
      );
    }
  }

  static async findByPseudo(pseudo) {
    console.log("toto");
    try {
      const [[result]] = await db.execute(
        `SELECT users.id, pseudo, email, password, email_verified, id_role AS role FROM users WHERE pseudo = ?`,
        [pseudo]
      );
      return result;
    } catch (error) {
      throw new Error("Erreur connexion utilisateur : " + error.message);
    }
  }

  static async getById(id) {
    try {
      const [[result]] = await db.execute("SELECT * FROM users WHERE id = ?", [
        id,
      ]);
      return result;
    } catch (error) {
      throw new Error("Erreur récupération utilisateur : " + error.message);
    }
  }

  static async countAll() {
    const [[rows]] = await db.query("SELECT COUNT(*) AS count FROM users");
    return rows.count;
  }

  static async markEmailAsVerified(email) {
    try {
      const [rows] = await db.execute(
        "UPDATE users SET email_verified = 1 WHERE email = ?",
        [email]
      );
      return rows;
    } catch (error) {
      throw new Error("Erreur lors de l'envoi de l'email' : " + error.message);
    }
  }
}

export default Users;
