import Characters from "../models/characters.model.js";

const createChar = async (req, res) => {
  const { name, short_desc, long_desc, image_url, id_gender, id_artwork } =
    req.body;
  const id_user = req.user.id;

  try {
    const existingChar = await Characters.findByName(name);

    if (existingChar) {
      return res.status(409).json({ message: "Ce personnage existe déjà." });
    }

    const [result] = await Characters.create(
      name,
      short_desc,
      long_desc,
      image_url,
      id_gender,
      id_artwork,
      id_user,
      "pending"
    );

    res.status(201).json({
      message:
        "Personnage soumis avec succès ! Il sera visible après validation par un administrateur.",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Erreur création personnage :", error);
    res.status(500).json({ error: "Erreur serveur lors de la création." });
  }
};

const getAllChars = async (req, res) => {
  try {
    const dataChars = await Characters.getAllApproved();

    if (!dataChars.length) {
      return res.status(200).json({
        dataChars: [],
        message: "Aucun personnage disponible",
      });
    }

    res.status(200).json(dataChars);
  } catch (error) {
    console.error("Erreur récupération personnages :", error);
    res.status(500).json({ error: error.message });
  }
};

const getPendingChars = async (req, res) => {
  try {
    const pendingChars = await Characters.getByStatus("pending");
    res.status(200).json(pendingChars);
  } catch (error) {
    console.error("Erreur récupération personnages en attente :", error);
    res.status(500).json({ error: error.message });
  }
};

const approveChar = async (req, res) => {
  const { id } = req.params;
  const adminId = req.user.id;

  try {
    const result = await Characters.updateStatus(id, "approved", adminId);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Personnage non trouvé." });
    }

    res.status(200).json({ message: "Personnage approuvé avec succès." });
  } catch (error) {
    console.error("Erreur approbation personnage :", error);
    res.status(500).json({ error: "Erreur serveur lors de l'approbation." });
  }
};

const rejectChar = async (req, res) => {
  const { id } = req.params;
  const adminId = req.user.id;

  try {
    const result = await Characters.updateStatus(id, "rejected", adminId);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Personnage non trouvé." });
    }

    res.status(200).json({ message: "Personnage rejeté." });
  } catch (error) {
    console.error("Erreur rejet personnage :", error);
    res.status(500).json({ error: "Erreur serveur lors du rejet." });
  }
};

const getAllCharsAdmin = async (req, res) => {
  try {
    const dataChars = await Characters.getAllForAdmin();
    res.status(200).json(dataChars);
  } catch (error) {
    console.error("Erreur récupération personnages admin :", error);
    res.status(500).json({ error: error.message });
  }
};

const updateChar = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "ID de personnage manquant." });
  }

  const { name, short_desc, long_desc, image_url, id_gender, id_artwork } =
    req.body;

  const fieldsToUpdate = {
    name,
    short_desc,
    long_desc,
    image_url,
    id_gender,
    id_artwork,
  };

  const cleanFields = Object.fromEntries(
    Object.entries(fieldsToUpdate).filter(([, value]) => value !== undefined)
  );

  try {
    const result = await Characters.update(id, cleanFields);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Personnage non trouvé." });
    }

    res.status(200).json({
      message: "Personnage mis à jour avec succès.",
      updatedCharacter: { id, ...cleanFields },
    });
  } catch (error) {
    console.error("Erreur mise à jour personnage :", error);
    res.status(500).json({
      error: "Erreur serveur lors de la mise à jour du personnage.",
    });
  }
};

const deleteChar = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Characters.delete(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Personnage non trouvé" });
    }

    res.status(200).json({ message: "Personnage supprimé avec succès" });
  } catch (error) {
    console.error("Erreur suppression personnage :", error);
    res.status(500).json({
      error: "Erreur serveur lors de la suppression du personnage",
    });
  }
};

const getCharById = async (req, res) => {
  try {
    const { id } = req.params;
    const dataChar = await Characters.getById(id);

    if (!dataChar) {
      return res.status(404).json({ message: "Personnage non trouvé" });
    }
    res.status(200).json(dataChar);
  } catch (error) {
    console.error("Erreur de récupération du personnage :", error);
    res.status(500).json({ error: error.message });
  }
};

export {
  getAllChars,
  createChar,
  updateChar,
  deleteChar,
  getCharById,
  getPendingChars,
  approveChar,
  rejectChar,
  getAllCharsAdmin,
};
