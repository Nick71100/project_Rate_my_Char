import db from "../config/db.js";

class Gender {
  static async create(label) {
    try {
      const result = await db.execute(
        "INSERT INTO genders (label) VALUES (?)",
        [label]
      );
      return result;
    } catch (error) {
      throw new Error("Erreur lors de la creation du genre : " + error.message);
    }
  }

  static async getAll() {
    try {
      const [result] = await db.query("SELECT * FROM genders");
      return result;
    } catch (error) {
      throw new Error(
        "Erreur lors de la récupération des genres : " + error.message
      );
    }
  }

  static async getById(id) {
    try {
      const [[result]] = await db.execute(
        "SELECT  * FROM genders WHERE id = ?",
        [id]
      );
      return result;
    } catch (error) {
      throw new Error("Erreur récupération genre : " + error.message);
    }
  }

  static async findByGender(gender) {
    try {
      const [[result]] = await db.execute(
        "SELECT id, label FROM genders WHERE gender = ?",
        [gender]
      );
      return result;
    } catch (error) {
      throw new Error("Erreur création genre : " + error.message);
    }
  }

  static async update(id, { label }) {
    try {
      const [result] = await db.execute(
        "UPDATE genders SET label = ? WHERE id = ?",
        [label, id]
      );
      return result;
    } catch (error) {
      throw new Error(
        "Erreur lors de la modification du genre : " + error.message
      );
    }
  }

  static async delete(id) {
    try {
      const [result] = await db.execute("DELETE FROM genders WHERE id = ?", [
        id,
      ]);
      return result;
    } catch (error) {
      throw new Error(
        "Erreur lors de la suppression du genre : " + error.message
      );
    }
  }
}

export default Gender;
