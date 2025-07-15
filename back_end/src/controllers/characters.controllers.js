import Characters from "../models/characters.model.js";

const createChar = async (req, res) => {
  const { name, short_desc, long_desc, image_url, id_gender, id_artwork } =
    req.body;

  const id_user = req.user.id;
  try {
    const char = await Characters.findByName(name);

    if (!char) {
      const [result] = await Characters.create(
        name,
        short_desc,
        long_desc,
        image_url,
        id_gender,
        id_artwork,
        id_user
      );
      res.status(201).json({ message: "Personnage créé", id: result.insertId });
      return;
    }
    res.status(409).json({ message: "Ce psersonnage existe déjà." });
  } catch (error) {
    if (error.message.includes("Duplicate entry")) {
      console.log(error.message);
      res.status(409).json({ message: "Ce personnage existe déjà." });
    }
    res.status(500).json({ error: error.message });
  }
};

const getAllChars = async (req, res) => {
  try {
    const dataChars = await Characters.getAll();
    if (!dataChars.length) {
      return res
        .status(200)
        .json({ dataChars: null, message: "Aucun personnage" });
    }
    res.status(200).json(dataChars);
  } catch (error) {
    console.error("Erreur récupération personnages :", error);
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

export { getAllChars, createChar, updateChar, deleteChar, getCharById };
