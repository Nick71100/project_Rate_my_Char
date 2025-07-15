import ArtworkCategorie from "../models/artworkCategorie.model.js";

const addCategoryToArtwork = async (req, res) => {
  const { artworkId, categoryId } = req.body;
  try {
    await ArtworkCategorie.addCategoryToArtwork(artworkId, categoryId);
    res.status(201).json({ message: "Catégorie ajoutée à l’œuvre." });
  } catch (error) {
    console.error("Erreur ajout catégorie à œuvre :", error);
    res.status(500).json({ error: "Erreur serveur lors de l'ajout." });
  }
};

const removeCategoryFromArtwork = async (req, res) => {
  const { artworkId, categoryId } = req.body;
  try {
    await ArtworkCategorie.removeCategoryFromArtwork(artworkId, categoryId);
    res.status(200).json({ message: "Catégorie retirée de l’œuvre." });
  } catch (error) {
    console.error("Erreur suppression catégorie de l’œuvre :", error);
    res.status(500).json({ error: "Erreur serveur lors de la suppression." });
  }
};

const getCategoriesByArtwork = async (req, res) => {
  try {
    const categories = await ArtworkCategorie.getCategoriesByArtworkId(
      req.params.id
    );
    res.status(200).json(categories);
  } catch (error) {
    console.error("Erreur récupération catégories :", error);
    res
      .status(500)
      .json({
        error: "Erreur serveur lors de la récupération des catégories.",
      });
  }
};

const getArtworksByCategory = async (req, res) => {
  try {
    const artworks = await ArtworkCategorie.getArtworksByCategoryId(
      req.params.id
    );
    res.status(200).json(artworks);
  } catch (error) {
    console.error("Erreur récupération œuvres :", error);
    res
      .status(500)
      .json({ error: "Erreur serveur lors de la récupération des œuvres." });
  }
};

export {
  addCategoryToArtwork,
  removeCategoryFromArtwork,
  getCategoriesByArtwork,
  getArtworksByCategory,
};
