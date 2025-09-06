import Users from "../models/user.model.js";
import bcrypt from "bcrypt";

const saltRounds = 10;

const getAllUsers = async (req, res) => {
  try {
    const users = await Users.getAll();
    res.status(200).json(users);
  } catch (error) {
    console.error("Erreur récupération utilisateurs :", error);
    res.status(500).json({
      error: "Erreur serveur lors de la récupération des utilisateurs",
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { pseudo, password, email, id_gender, id_role } = req.body;

    const updatedFields = {};

    if (pseudo && pseudo.trim() !== "") updatedFields.pseudo = pseudo;
    if (email && email.trim() !== "") updatedFields.email = email;
    if (id_gender !== undefined) updatedFields.id_gender = id_gender;
    if (id_role !== undefined) updatedFields.id_role = id_role;

    if (password && password.trim() !== "") {
      const hash = await bcrypt.hash(password, saltRounds);
      updatedFields.password = hash;
    }

    if (Object.keys(updatedFields).length === 0) {
      return res.status(400).json({ message: "Aucun champ à mettre à jour." });
    }

    const result = await Users.update(id, updatedFields);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.status(200).json({ message: "Utilisateur mis à jour avec succès" });
  } catch (error) {
    console.error("Erreur mise à jour utilisateur :", error);
    res.status(500).json({
      error: "Erreur serveur lors de la mise à jour de l'utilisateur",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Users.delete(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.clearCookie("jwt", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.status(200).json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    console.error("Erreur suppression utilisateur :", error);
    res.status(500).json({
      error: "Erreur serveur lors de la suppression de l'utilisateur",
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const dataUser = await Users.getById(id);

    if (!dataUser) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.status(200).json(dataUser);
  } catch (error) {
    console.error("Erreur de récupération de l'utilisateur :", error);
    res.status(500).json({ error: error.message });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const user = await Users.getById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Erreur getCurrentUser :", error);
    res.status(500).json({
      message: "Erreur serveur lors de la récupération de l'utilisateur",
    });
  }
};

export { getAllUsers, updateUser, deleteUser, getUserById, getCurrentUser };
