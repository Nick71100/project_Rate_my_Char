import db from "../config/db.js";

class Categorie {
  static async create(categorie) {
    try {
      const result = await db.execute(
        "INSERT INTO categories (categorie) VALUES (?)",
        [categorie]
      );
      return result;
    } catch (error) {
      throw new Error(
        "Erreur lors de la creation de la catégorie : " + error.message
      );
    }
  }

  static async getAll() {
    try {
      const [result] = await db.query("SELECT * FROM categories");
      return result;
    } catch (error) {
      throw new Error(
        "Erreur lors de la récupération de la catégorie : " + error.message
      );
    }
  }

  static async getById(id) {
    try {
      const [[result]] = await db.execute(
        "SELECT  * FROM categories WHERE id = ?",
        [id]
      );
      return result;
    } catch (error) {
      throw new Error("Erreur récupération categorie : " + error.message);
    }
  }

  static async findByCategorie(categorie) {
    try {
      const [[result]] = await db.execute(
        "SELECT id, categorie FROM categories WHERE categorie = ?",
        [categorie]
      );
      return result;
    } catch (error) {
      throw new Error("Erreur création categorie : " + error.message);
    }
  }

  static async update(id, { categorie }) {
    try {
      const [result] = await db.execute(
        "UPDATE categories SET categorie = ? WHERE id = ?",
        [categorie, id]
      );
      return result;
    } catch (error) {
      throw new Error(
        "Erreur lors de la modification de la catégorie : " + error.message
      );
    }
  }

  static async delete(id) {
    try {
      const [result] = await db.execute("DELETE FROM categories WHERE id = ?", [
        id,
      ]);
      return result;
    } catch (error) {
      throw new Error(
        "Erreur lors de la suppression de la catégorie : " + error.message
      );
    }
  }
}

export default Categorie;
