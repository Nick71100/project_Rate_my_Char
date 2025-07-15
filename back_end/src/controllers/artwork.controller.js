import Artworks from "../models/artwork.model.js";

const createArtwork = async (req, res) => {
  const { title, product_year, image_url, description, author } = req.body;

  try {
    const artwork = await Artworks.findByTitle(title);

    if (!artwork) {
      const [result] = await Artworks.create(
        title,
        product_year,
        image_url,
        description,
        author
      );
      res.status(201).json({ message: "Oeuvre créée", id: result.insertId });
      return;
    }
    res.status(409).json({ message: "Oeuvre déjà existante." });
  } catch (error) {
    if (error.message.includes("Duplicate entry")) {
      console.log(error.message);
      res.status(409).json({ message: "Oeuvre déjà existante." });
    }
    res.status(500).json({ error: error.message });
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
  const { title, product_year, image_url, description, author } = req.body;

  try {
    const { id } = req.params;
    const result = await Artworks.update(id, {
      title,
      product_year,
      image_url,
      description,
      author,
    });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Oeuvre non trouvée" });
    }

    res.status(200).json({ message: "Oeuvre mise à jour avec succès" });
  } catch (error) {
    console.error("Erreur mise à jour oeuvre :", error);
    res.status(500).json({
      error: "Erreur serveur lors de la mise à jour de l'oeuvre",
    });
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
