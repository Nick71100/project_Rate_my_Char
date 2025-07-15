import Categorie from "../models/categorie.model.js";

const createCategorie = async (req, res) => {
  const { categorie } = req.body;

  try {
    const categ = await Categorie.findByCategorie(categorie);

    if (!categ) {
      const [result] = await Categorie.create(categorie);
      res.status(201).json({ message: "Categorie créée", id: result.insertId });
      return;
    }
    res.status(409).json({ message: "Categorie déjà existante." });
  } catch (error) {
    if (error.message.includes("Duplicate entry")) {
      console.log(error.message);
      res.status(409).json({ message: "Categorie déjà existante." });
    }
    res.status(500).json({ error: error.message });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categorie = await Categorie.getAll();
    res.status(200).json(categorie);
  } catch (error) {
    console.error("Erreur récupération categorie :", error);
    res.status(500).json({
      error: "Erreur serveur lors de la récupération des categories",
    });
  }
};

const getCategorieById = async (req, res) => {
  try {
    const { id } = req.params;
    const dataCategorie = await Categorie.getById(id);

    if (!dataCategorie) {
      return res.status(404).json({ message: "Categorie non trouvée." });
    }
    res.status(200).json(dataCategorie);
  } catch (error) {
    console.error("Erreur de récupération de la categorie : ", error);
    res.status(500).json({ error: error.message });
  }
};

const updateCategorie = async (req, res) => {
  const { categorie } = req.body;

  try {
    const { id } = req.params;
    const result = await Categorie.update(id, { categorie });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Categorie non trouvée" });
    }

    res.status(200).json({ message: "Categorie mise à jour avec succès" });
  } catch (error) {
    console.error("Erreur mise à jour categorie :", error);
    res.status(500).json({
      error: "Erreur serveur lors de la mise à jour de la categorie",
    });
  }
};

const deleteCategorie = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Categorie.delete(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Categorie non trouvé" });
    }

    res.status(200).json({ message: "Categorie supprimé avec succès" });
  } catch (error) {
    console.error("Erreur suppression categorie :", error);
    res.status(500).json({
      error: "Erreur serveur lors de la suppression de la categorie",
    });
  }
};

export {
  createCategorie,
  getAllCategories,
  getCategorieById,
  updateCategorie,
  deleteCategorie,
};
