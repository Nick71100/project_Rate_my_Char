import db from "../config/db.js";

class Artworks {
  static async create(title, product_year, image_url, description, author) {
    try {
      const result = await db.execute(
        "INSERT INTO artworks (title, product_year, image_url, description, author) VALUES (?, ?, ?, ?, ?)",
        [title, product_year, image_url, description, author]
      );
      return result;
    } catch (error) {
      throw new Error(
        "Erreur lors de la creation de l'oeuvre : " + error.message
      );
    }
  }

  static async getAll() {
    try {
      const [result] = await db.query("SELECT * FROM artworks");
      return result;
    } catch (error) {
      throw new Error(
        "Erreur lors de la récupération des oeuvres : " + error.message
      );
    }
  }

  static async getById(id) {
    try {
      const [[artwork]] = await db.execute(
        "SELECT  * FROM artworks WHERE id = ?",
        [id]
      );
      if (!artwork) return null;

      const [categories] = await db.execute(
        `
      SELECT c.categorie
      FROM categories c
      INNER JOIN artworks_categories ac ON c.id = ac.category_id
      WHERE ac.artwork_id = ?
    `,
        [id]
      );

      artwork.categories = categories.map((cat) => cat.categorie);

      return artwork;
    } catch (error) {
      throw new Error("Erreur récupération oeuvre : " + error.message);
    }
  }

  static async findByTitle(title) {
    try {
      const [[result]] = await db.execute(
        "SELECT id, title, product_year, image_url FROM artworks WHERE title = ?",
        [title]
      );
      return result;
    } catch (error) {
      throw new Error("Erreur création utilisateur : " + error.message);
    }
  }

  static async update(
    id,
    { title, product_year, image_url, description, author }
  ) {
    try {
      const [result] = await db.execute(
        "UPDATE artworks SET title = ?, product_year = ?, image_url = ?, description = ?, author = ? WHERE id = ?",
        [title, product_year, image_url, description, author, id]
      );
      return result;
    } catch (error) {
      throw new Error(
        "Erreur lors de la modification de l'oeuvre : " + error.message
      );
    }
  }

  static async delete(id) {
    try {
      const [result] = await db.execute("DELETE FROM artworks WHERE id = ?", [
        id,
      ]);
      return result;
    } catch (error) {
      throw new Error(
        "Erreur lors de la suppression de l'oeuvre : " + error.message
      );
    }
  }

  static async countAll() {
    const [[rows]] = await db.query("SELECT COUNT(*) AS count FROM artworks");
    return rows.count;
  }
}

export default Artworks;
