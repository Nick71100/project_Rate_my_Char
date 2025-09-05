import Artworks from "../models/artwork.model.js";
import ArtworkCategory from "../models/artworkCategory.model.js";
import db from "../config/db.js";

const createArtwork = async (req, res) => {
  const { title, product_year, image_url, description, author, categories } =
    req.body;

  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    const existingArtwork = await Artworks.findByTitle(title);
    if (existingArtwork) {
      await connection.rollback();
      return res.status(409).json({ message: "Oeuvre déjà existante." });
    }

    const [result] = await connection.execute(
      "INSERT INTO artworks (title, product_year, image_url, description, author) VALUES (?, ?, ?, ?, ?)",
      [title, product_year, image_url, description, author]
    );

    const artworkId = result.insertId;

    if (categories && categories.length > 0) {
      const values = categories.map((categoryId) => [artworkId, categoryId]);
      await connection.query(
        "INSERT INTO artworks_categories (artwork_id, category_id) VALUES ?",
        [values]
      );
    }

    await connection.commit();

    const createdArtwork = await Artworks.getById(artworkId);

    res.status(201).json({
      message: "Oeuvre créée",
      id: artworkId,
      artwork: createdArtwork,
    });
  } catch (error) {
    await connection.rollback();
    console.error("Erreur création artwork:", error);

    if (error.message.includes("Duplicate entry")) {
      res.status(409).json({ message: "Oeuvre déjà existante." });
    } else {
      res.status(500).json({ error: error.message });
    }
  } finally {
    connection.release();
  }
};

const getAllArtworks = async (req, res) => {
  try {
    const artwork = await Artworks.getAll();
    res.status(200).json(artwork);
  } catch (error) {
    console.error("Erreur récupération oeuvre :", error);
    res.status(500).json({
      error: "Erreur serveur lors de la récupération des oeuvres",
    });
  }
};

const getArtworkById = async (req, res) => {
  try {
    const { id } = req.params;
    const dataArtwork = await Artworks.getById(id);

    if (!dataArtwork) {
      return res.status(404).json({ message: "Oeuvre non trouvée." });
    }
    res.status(200).json(dataArtwork);
  } catch (error) {
    console.error("Erreur de récupération de l'oeuvre : ", error);
    res.status(500).json({ error: error.message });
  }
};

const updateArtwork = async (req, res) => {
  const { title, product_year, image_url, description, author, categories } =
    req.body;

  const connection = await db.getConnection();

  try {
    const { id } = req.params;

    await connection.beginTransaction();

    const [updateResult] = await connection.execute(
      "UPDATE artworks SET title = ?, product_year = ?, image_url = ?, description = ?, author = ? WHERE id = ?",
      [title, product_year, image_url, description, author, id]
    );

    if (updateResult.affectedRows === 0) {
      await connection.rollback();
      return res.status(404).json({ message: "Oeuvre non trouvée" });
    }

    await connection.execute(
      "DELETE FROM artworks_categories WHERE artwork_id = ?",
      [id]
    );

    if (categories && categories.length > 0) {
      const values = categories.map((categoryId) => [id, categoryId]);
      await connection.query(
        "INSERT INTO artworks_categories (artwork_id, category_id) VALUES ?",
        [values]
      );
    }

    await connection.commit();

    const updatedArtwork = await Artworks.getById(id);

    res.status(200).json(updatedArtwork);
  } catch (error) {
    await connection.rollback();
    console.error("Erreur mise à jour oeuvre :", error);
    res.status(500).json({
      error: "Erreur serveur lors de la mise à jour de l'oeuvre",
    });
  } finally {
    connection.release();
  }
};

const deleteArtwork = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Artworks.delete(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Oeuvre non trouvé" });
    }

    res.status(200).json({ message: "Oeuvre supprimé avec succès" });
  } catch (error) {
    console.error("Erreur suppression oeuvre :", error);
    res.status(500).json({
      error: "Erreur serveur lors de la suppression de l'oeuvre",
    });
  }
};

export {
  createArtwork,
  getAllArtworks,
  getArtworkById,
  updateArtwork,
  deleteArtwork,
};
