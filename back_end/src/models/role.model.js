import db from "../config/db.js";

class Role {
  static async create(label_role) {
    try {
      const result = await db.execute(
        "INSERT INTO roles (label_role) VALUES (?)",
        [label_role]
      );
      return result;
    } catch (error) {
      throw new Error("Erreur lors de la creation du role : " + error.message);
    }
  }

  static async getAll() {
    try {
      const [result] = await db.query("SELECT * FROM roles");
      return result;
    } catch (error) {
      throw new Error(
        "Erreur lors de la récupération des roles : " + error.message
      );
    }
  }

  static async getById(id) {
    try {
      const [[result]] = await db.execute("SELECT  * FROM roles WHERE id = ?", [
        id,
      ]);
      return result;
    } catch (error) {
      throw new Error("Erreur récupération role : " + error.message);
    }
  }

  static async findByLabelRole(label_role) {
    try {
      const [[result]] = await db.execute(
        "SELECT id, label_role FROM roles WHERE label_role = ?",
        [label_role]
      );
      return result;
    } catch (error) {
      throw new Error("Erreur création role : " + error.message);
    }
  }

  static async update(id, { label_role }) {
    try {
      const [result] = await db.execute(
        "UPDATE roles SET label_role = ? WHERE id = ?",
        [label_role, id]
      );
      return result;
    } catch (error) {
      throw new Error(
        "Erreur lors de la modification du role : " + error.message
      );
    }
  }

  static async delete(id) {
    try {
      const [result] = await db.execute("DELETE FROM roles WHERE id = ?", [id]);
      return result;
    } catch (error) {
      throw new Error(
        "Erreur lors de la suppression du role : " + error.message
      );
    }
  }
}

export default Role;
