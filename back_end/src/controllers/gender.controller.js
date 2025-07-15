import Gender from "../models/gender.model.js";

const createGender = async (req, res) => {
  const { label } = req.body;

  try {
    const gender = await Gender.findByLabel(label);

    if (!gender) {
      const [result] = await Gender.create(label);
      res.status(201).json({ message: "Genre créée", id: result.insertId });
      return;
    }
    res.status(409).json({ message: "Genre déjà existante." });
  } catch (error) {
    if (error.message.includes("Duplicate entry")) {
      console.log(error.message);
      res.status(409).json({ message: "Genre déjà existante." });
    }
    res.status(500).json({ error: error.message });
  }
};

const getAllGenders = async (req, res) => {
  try {
    const gender = await Gender.getAll();
    res.status(200).json(gender);
  } catch (error) {
    console.error("Erreur récupération genre :", error);
    res.status(500).json({
      error: "Erreur serveur lors de la récupération des genres",
    });
  }
};

const getGenderById = async (req, res) => {
  try {
    const { id } = req.params;
    const dataGender = await Gender.getById(id);

    if (!dataGender) {
      return res.status(404).json({ message: "Genre non trouvée." });
    }
    res.status(200).json(dataGender);
  } catch (error) {
    console.error("Erreur de récupération du genre : ", error);
    res.status(500).json({ error: error.message });
  }
};

const updateGender = async (req, res) => {
  const { label } = req.body;

  try {
    const { id } = req.params;
    const result = await Gender.update(id, { label });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Genre non trouvée" });
    }

    res.status(200).json({ message: "Genre mise à jour avec succès" });
  } catch (error) {
    console.error("Erreur mise à jour genre :", error);
    res.status(500).json({
      error: "Erreur serveur lors de la mise à jour du genre",
    });
  }
};

const deleteGender = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Gender.delete(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Genre non trouvé" });
    }

    res.status(200).json({ message: "Genre supprimé avec succès" });
  } catch (error) {
    console.error("Erreur suppression genre :", error);
    res.status(500).json({
      error: "Erreur serveur lors de la suppression du genre",
    });
  }
};

export {
  createGender,
  getAllGenders,
  getGenderById,
  updateGender,
  deleteGender,
};
