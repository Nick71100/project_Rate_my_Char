import Role from "../models/role.model.js";

const createRole = async (req, res) => {
  const { label_role } = req.body;

  try {
    const role = await Role.findByLabelRole(label_role);

    if (!role) {
      const [result] = await Role.create(label_role);
      res.status(201).json({ message: "Role créée", id: result.insertId });
      return;
    }
    res.status(409).json({ message: "Role déjà existante." });
  } catch (error) {
    if (error.message.includes("Duplicate entry")) {
      console.log(error.message);
      res.status(409).json({ message: "Role déjà existante." });
    }
    res.status(500).json({ error: error.message });
  }
};

const getAllRoles = async (req, res) => {
  try {
    const role = await Role.getAll();
    res.status(200).json(role);
  } catch (error) {
    console.error("Erreur récupération role :", error);
    res.status(500).json({
      error: "Erreur serveur lors de la récupération des roles",
    });
  }
};

const getRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const dataRole = await Role.getById(id);

    if (!dataRole) {
      return res.status(404).json({ message: "Role non trouvée." });
    }
    res.status(200).json(dataRole);
  } catch (error) {
    console.error("Erreur de récupération du role : ", error);
    res.status(500).json({ error: error.message });
  }
};

const updateRole = async (req, res) => {
  const { label_role } = req.body;

  try {
    const { id } = req.params;
    const result = await Role.update(id, { label_role });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Role non trouvée" });
    }

    res.status(200).json({ message: "Role mise à jour avec succès" });
  } catch (error) {
    console.error("Erreur mise à jour role :", error);
    res.status(500).json({
      error: "Erreur serveur lors de la mise à jour du role",
    });
  }
};

const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Role.delete(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Role non trouvé" });
    }

    res.status(200).json({ message: "Role supprimé avec succès" });
  } catch (error) {
    console.error("Erreur suppression role :", error);
    res.status(500).json({
      error: "Erreur serveur lors de la suppression du role",
    });
  }
};

export { createRole, getAllRoles, getRoleById, updateRole, deleteRole };
