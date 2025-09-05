import db from "../config/db.js";

class Votes {
  static async createVote(userId, characterId, criteriaId) {
    try {
      await db.execute(
        "INSERT INTO votes (id_user, id_character, id_criteria, created_at) VALUES (?, ?, ?, NOW())",
        [userId, characterId, criteriaId]
      );
    } catch (error) {
      throw new Error("Erreur lors de la création du vote : " + error.message);
    }
  }

  static async findUserVote(userId, criteriaId) {
    try {
      if (
        userId === undefined ||
        userId === null ||
        criteriaId === undefined ||
        criteriaId === null
      ) {
        throw new Error(
          "userId ou criteriaId est manquant (undefined ou null)"
        );
      }
      const [result] = await db.execute(
        "SELECT * FROM votes WHERE id_user = ? AND id_criteria = ?",
        [userId, criteriaId]
      );
      return result[0];
    } catch (error) {
      throw new Error("Erreur récupération du vote : " + error.message);
    }
  }

  static async updateVote(voteId, newCharacterId) {
    try {
      await db.execute(
        "UPDATE votes SET id_character = ?, created_at = NOW() WHERE id = ?",
        [newCharacterId, voteId]
      );
    } catch (error) {
      throw new Error("Erreur modification du vote : " + error.message);
    }
  }

  static async getVotesByUser(userId) {
    try {
      const [result] = await db.execute(
        `SELECT v.id_criteria, v.id_character, c.label AS criteria_name, ch.name AS character_name
        FROM votes v
        JOIN criterias c ON v.id_criteria = c.id
        JOIN characters ch ON v.id_character = ch.id
        WHERE v.id_user = ?`,
        [userId]
      );
      return result;
    } catch (error) {
      throw new Error(
        "Erreur récupération des votes de l'utilisateur : " + error.message
      );
    }
  }

  static async getRankingByCriterion(criterionId) {
    try {
      const [result] = await db.execute(
        `SELECT characters.id, characters.name, COUNT(v.id) AS vote_count
         FROM votes v
         JOIN characters ON v.id_character = characters.id
         WHERE v.id_criteria = ?
         GROUP BY characters.id
         ORDER BY vote_count DESC`,
        [criterionId]
      );
      return result;
    } catch (error) {
      throw new Error(
        "Erreur récupération des votes par critère : " + error.message
      );
    }
  }

  static async getAllRankings() {
    try {
      const [result] = await db.execute(
        `SELECT v.id_criteria, c.name AS character_name, c.id AS character_id, COUNT(v.id) AS vote_count
       FROM votes v
       JOIN characters c ON v.id_character = c.id
       GROUP BY v.id_criteria, c.id
       ORDER BY v.id_criteria, vote_count DESC`
      );
      return result;
    } catch (error) {
      throw new Error(
        "Erreur récupération de tous les classements : " + error.message
      );
    }
  }

  static async getVoteStatsByCharacter(characterId) {
    try {
      const [rows] = await db.execute(
        `
        SELECT 
          c.label as criteria_name,
          COUNT(v.id) as vote_count
        FROM criterias c
        LEFT JOIN votes v ON c.id = v.id_criteria AND v.id_character = ?
        GROUP BY c.id, c.label
        ORDER BY c.label
        `,
        [characterId]
      );
      return rows;
    } catch (error) {
      throw new Error(
        "Erreur récupération stats votes du personnage : " + error.message
      );
    }
  }
}

export default Votes;
