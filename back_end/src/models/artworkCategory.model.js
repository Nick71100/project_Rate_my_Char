import db from "../config/db.js";

class ArtworkCategory {
  static async addCategoryToArtwork(artworkId, categoryId) {
    try {
      const [result] = await db.execute(
        "INSERT INTO artworks_categories (artwork_id, category_id) VALUES (?, ?)",
        [artworkId, categoryId]
      );
      return result;
    } catch (error) {
      throw new Error("Erreur ajout catégorie à l'œuvre : " + error.message);
    }
  }

  static async removeCategoryFromArtwork(artworkId, categoryId) {
    try {
      const [result] = await db.execute(
        "DELETE FROM artworks_categories WHERE artwork_id = ? AND category_id = ?",
        [artworkId, categoryId]
      );
      return result;
    } catch (error) {
      throw new Error(
        "Erreur suppression catégorie de l'œuvre : " + error.message
      );
    }
  }

  static async removeAllCategoriesFromArtwork(artworkId) {
    try {
      const [result] = await db.execute(
        "DELETE FROM artworks_categories WHERE artwork_id = ?",
        [artworkId]
      );
      return result;
    } catch (error) {
      throw new Error(
        "Erreur suppression toutes catégories : " + error.message
      );
    }
  }

  static async getCategoriesByArtworkId(artworkId) {
    try {
      const [rows] = await db.execute(
        `SELECT c.id, c.categorie 
         FROM categories c
         JOIN artworks_categories ac ON c.id = ac.category_id
         WHERE ac.artwork_id = ?`,
        [artworkId]
      );
      return rows;
    } catch (error) {
      throw new Error(
        "Erreur récupération catégories de l'œuvre : " + error.message
      );
    }
  }

  static async getArtworksByCategoryId(categoryId) {
    try {
      const [rows] = await db.execute(
        `SELECT a.id, a.title, a.image_url, a.product_year, a.author
         FROM artworks a
         JOIN artworks_categories ac ON a.id = ac.artwork_id
         WHERE ac.category_id = ?`,
        [categoryId]
      );
      return rows;
    } catch (error) {
      throw new Error(
        "Erreur récupération œuvres de la catégorie : " + error.message
      );
    }
  }

  // Méthode utile pour vérifier si une association existe
  static async associationExists(artworkId, categoryId) {
    try {
      const [[result]] = await db.execute(
        "SELECT COUNT(*) as count FROM artworks_categories WHERE artwork_id = ? AND category_id = ?",
        [artworkId, categoryId]
      );
      return result.count > 0;
    } catch (error) {
      throw new Error("Erreur vérification association : " + error.message);
    }
  }
}

export default ArtworkCategory;
