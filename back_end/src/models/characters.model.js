import db from "../config/db.js";

class Characters {
  static async create(
    name,
    short_desc,
    long_desc,
    image_url,
    id_gender,
    id_artwork,
    id_user
  ) {
    try {
      const result = await db.execute(
        "INSERT INTO characters (name, short_desc, long_desc, image_url, id_gender, id_artwork, id_user) VALUES (?, ?, ?, ?, ?, ?, ?) ",
        [name, short_desc, long_desc, image_url, id_gender, id_artwork, id_user]
      );
      return result;
    } catch (error) {
      throw new Error(
        "Erreur lors de la création du personnage :" + error.message
      );
    }
  }

  static async getAll() {
    try {
      const [result] = await db.query("SELECT * FROM characters");
      return result;
    } catch (error) {
      throw new Error(
        "Erreur lors de la récupération des personnages : " + error.message
      );
    }
  }

  static async update(id, data) {
    try {
      const fields = [];
      const values = [];

      for (const [key, value] of Object.entries(data)) {
        if (value !== undefined) {
          fields.push(`${key} = ?`);
          values.push(value);
        }
      }

      if (fields.length === 0) {
        throw new Error("Aucune donnée à mettre à jour.");
      }

      values.push(id);

      const sql = `UPDATE characters SET ${fields.join(", ")} WHERE id = ?`;
      await db.execute(sql, values);

      const [updated] = await db.execute(
        "SELECT * FROM characters WHERE id = ?",
        [id]
      );
      return updated[0];
    } catch (error) {
      throw new Error(
        "Erreur lors de la modification du personnage : " + error.message
      );
    }
  }

  static async delete(id) {
    try {
      const result = await db.execute("DELETE FROM characters WHERE id = ?", [
        id,
      ]);
      return result;
    } catch (error) {
      throw new Error(
        "Erreur lors de la suppression du personnage : " + error.message
      );
    }
  }

  static async findByName(name) {
    try {
      const [[result]] = await db.execute(
        "SELECT id, name, id_user FROM characters WHERE name = ?",
        [name]
      );
      return result;
    } catch (error) {
      throw new Error("Erreur création personnage : " + error.message);
    }
  }

  static async getById(id) {
    try {
      const [[result]] = await db.execute(
        "SELECT * FROM characters WHERE id = ?",
        [id]
      );
      return result;
    } catch (error) {
      throw new Error("Erreur récupération personnage : " + error.message);
    }
  }

  static async countAll() {
    const [[rows]] = await db.query("SELECT COUNT(*) AS count FROM characters");
    return rows.count;
  }
}

export default Characters;
