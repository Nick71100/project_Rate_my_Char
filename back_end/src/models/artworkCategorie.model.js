import db from "../config/db.js";

class ArtworkCategorie {
  static async addCategoryToArtwork(artworkId, categoryId) {
    const [result] = await db.execute(
      "INSERT INTO artworks_categories (artwork_id, category_id) VALUES (?, ?)",
      [artworkId, categoryId]
    );
    return result;
  }

  static async removeCategoryFromArtwork(artworkId, categoryId) {
    const [result] = await db.execute(
      "DELETE FROM artworks_categories WHERE artwork_id = ? AND category_id = ?",
      [artworkId, categoryId]
    );
    return result;
  }

  static async getCategoriesByArtworkId(artworkId) {
    const [rows] = await db.execute(
      `SELECT c.id, c.label 
       FROM categories c
       JOIN artworks_categories ac ON c.id = ac.category_id
       WHERE ac.artwork_id = ?`,
      [artworkId]
    );
    return rows;
  }

  static async getArtworksByCategoryId(categoryId) {
    const [rows] = await db.execute(
      `SELECT a.id, a.title, a.image_url, a.product_year 
       FROM artworks a
       JOIN artworks_categories ac ON a.id = ac.artwork_id
       WHERE ac.category_id = ?`,
      [categoryId]
    );
    return rows;
  }
}

export default ArtworkCategorie;
