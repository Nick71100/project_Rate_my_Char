import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Users from "../models/user.model.js";
import { sendEmailConfirmation } from "../services/email.service.js";
import generateToken from "../utils/generateToken.js";

const saltRounds = 10;

const createUser = async (req, res) => {
  const { pseudo, password, email, id_gender } = req.body;

  try {
    const user = await Users.findByPseudo(pseudo);

    if (!user) {
      const hash = await bcrypt.hash(password, saltRounds);
      const [result] = await Users.create(pseudo, hash, email, id_gender);
      const emailToken = generateToken({
        email,
        purpose: "email_verification",
      });

      const responseEmailSent = await sendEmailConfirmation(email, emailToken);

      if (responseEmailSent.error) {
        await Users.deleteById(response.insertId);

        return res.status(500).json({
          error: "Échec lors de l'envoi de l'email de confirmation.",
          error: responseEmailSent.error.message,
        });
      }
      res
        .status(201)
        .json({ message: "Utilisateur créé", id: result.insertId });
      return;
    }
    res.status(409).json({ message: "Pseudo déjà utilisé." });
  } catch (error) {
    if (error.message.includes("Duplicate entry")) {
      console.log(error.message);
      res.status(409).json({ message: "Pseudo déjà utilisé." });
    }
    res.status(500).json({ error: error.message });
  }
};

const verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
    const decodedToken = decodeURIComponent(token);
    const payload = jwt.verify(decodedToken, process.env.JWT_SECRET);

    if (payload.purpose !== "email_verification") {
      return res.status(400).json({ message: "Token invalide." });
    }

    await Users.markEmailAsVerified(payload.email);

    res.status(200).json({
      message: "Adresse email vérifiée avec succès.",
    });
  } catch (err) {
    console.error("Erreur de vérification de token :", err.message);
    return res.status(400).json({ message: "Lien invalide ou expiré." });
  }
};

const login = async (req, res) => {
  const { pseudo, password } = req.body;

  try {
    const user = await Users.findByPseudo(pseudo);
    console.log(user);
    if (user) {
      const validPassword = await bcrypt.compare(password, user.password);

      if (validPassword) {
        const payload = {
          id: user.id,
          pseudo: user.pseudo,
          role: user.role,
        };
        const authToken = generateToken(payload);
        console.log(authToken);
        res.cookie("jwt", authToken, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
          maxAge: 7200000,
        });
        res.json({
          message: "Connexion autorisée.",
          user: {
            id: user.id,
            pseudo,
            role: user.role,
          },
        });

        return;
      } else {
        res.status(409).json({ message: "identtifiant(s) invalide(s)" });
      }
    } else {
      res.status(404).json({ message: "identtifiant(s) invalide(s)" });
      return;
    }
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    res.status(500).json({ message: error.message });
  }
};

const logout = (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 7200000,
  });
  res.json({ message: "Utilisateur déconnecté." });
};

const getCurrentUser = (req, res) => {
  const { pseudo, id_role } = req.user;
  res.json({ user: { pseudo, id_role } });
};

export { createUser, login, logout, getCurrentUser, verifyEmail };
