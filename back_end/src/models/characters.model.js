import db from "../config/db.js";

class Characters {
  static async create(
    name,
    short_desc,
    long_desc,
    image_url,
    id_gender,
    id_artwork,
    id_user,
    status = "pending"
  ) {
    try {
      const result = await db.execute(
        "INSERT INTO characters (name, short_desc, long_desc, image_url, id_gender, id_artwork, id_user, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [
          name,
          short_desc,
          long_desc,
          image_url,
          id_gender,
          id_artwork,
          id_user,
          status,
        ]
      );
      return result;
    } catch (error) {
      throw new Error(
        "Erreur lors de la création du personnage: " + error.message
      );
    }
  }

  static async getAllApproved() {
    try {
      const [result] = await db.query(`
        SELECT 
          c.*, 
          g.gender as gender_label,
          a.title as artwork_title,
          u.pseudo as creator_username
        FROM characters c
        LEFT JOIN genders g ON c.id_gender = g.id
        LEFT JOIN artworks a ON c.id_artwork = a.id
        LEFT JOIN users u ON c.id_user = u.id
        WHERE c.status = 'approved'
        ORDER BY c.submitted_at DESC
      `);
      return result;
    } catch (error) {
      throw new Error(
        "Erreur lors de la récupération des personnages approuvés: " +
          error.message
      );
    }
  }

  static async getByStatus(status) {
    try {
      const [result] = await db.execute(
        `
      SELECT 
        c.*, 
        g.gender as gender_label,
        a.title as artwork_title,
        u.pseudo as creator_username
      FROM characters c
      LEFT JOIN genders g ON c.id_gender = g.id
      LEFT JOIN artworks a ON c.id_artwork = a.id
      LEFT JOIN users u ON c.id_user = u.id
      WHERE c.status = ?
      ORDER BY c.submitted_at DESC
    `,
        [status]
      );
      return result;
    } catch (error) {
      throw new Error(
        "Erreur lors de la récupération par status: " + error.message
      );
    }
  }

  static async updateStatus(id, status, reviewedBy) {
    try {
      const result = await db.execute(
        "UPDATE characters SET status = ?, reviewed_at = NOW(), reviewed_by = ? WHERE id = ?",
        [status, reviewedBy, id]
      );
      return result;
    } catch (error) {
      throw new Error(
        "Erreur lors de la mise à jour du statut: " + error.message
      );
    }
  }

  static async getAllForAdmin() {
    try {
      const [result] = await db.query(`
      SELECT 
        c.*, 
        g.gender as gender_label,
        a.title as artwork_title,
        u.pseudo as creator_username
      FROM characters c
      LEFT JOIN genders g ON c.id_gender = g.id
      LEFT JOIN artworks a ON c.id_artwork = a.id
      LEFT JOIN users u ON c.id_user = u.id
      ORDER BY c.submitted_at DESC
    `);
      return result;
    } catch (error) {
      throw new Error(
        "Erreur lors de la récupération des personnages admin: " + error.message
      );
    }
  }

  static async getPendingCount() {
    try {
      const [[result]] = await db.execute(
        "SELECT COUNT(*) as count FROM characters WHERE status = 'pending'"
      );
      return result.count;
    } catch (error) {
      throw new Error("Erreur lors du comptage en attente: " + error.message);
    }
  }

  static async getStats() {
    try {
      const [rows] = await db.execute(`
        SELECT 
          status,
          COUNT(*) as count
        FROM characters 
        GROUP BY status
      `);
      return rows.reduce((acc, row) => {
        acc[row.status] = row.count;
        return acc;
      }, {});
    } catch (error) {
      throw new Error(
        "Erreur lors de la récupération des stats: " + error.message
      );
    }
  }

  static async getAll() {
    try {
      const [result] = await db.query(`
        SELECT 
          c.*, 
          g.gender as gender_label,
          a.title as artwork_title
        FROM characters c
        LEFT JOIN genders g ON c.id_gender = g.id
        LEFT JOIN artworks a ON c.id_artwork = a.id
        WHERE c.status = 'approved'
        ORDER BY c.name
      `);
      return result;
    } catch (error) {
      throw new Error(
        "Erreur lors de la récupération des personnages: " + error.message
      );
    }
  }

  static async findByName(name) {
    try {
      const [[result]] = await db.execute(
        "SELECT id, name, id_user FROM characters WHERE name = ?",
        [name]
      );
      return result;
    } catch (error) {
      throw new Error("Erreur création personnage: " + error.message);
    }
  }

  static async getById(id) {
    if (!id || isNaN(id)) {
      throw new Error("ID invalide");
    }
    try {
      const [[result]] = await db.execute(
        `
        SELECT 
          c.*, 
          g.gender as gender_label,
          a.title as artwork_title,
          u.pseudo as creator_username
        FROM characters c
        LEFT JOIN genders g ON c.id_gender = g.id
        LEFT JOIN artworks a ON c.id_artwork = a.id
        LEFT JOIN users u ON c.id_user = u.id
        WHERE c.id = ?
      `,
        [id]
      );
      return result;
    } catch (error) {
      throw new Error("Erreur récupération personnage: " + error.message);
    }
  }

  static async update(id, data) {
    try {
      const fields = [];
      const values = [];

      for (const [key, value] of Object.entries(data)) {
        if (value !== undefined) {
          fields.push(`${key} = ?`);
          values.push(value);
        }
      }

      if (fields.length === 0) {
        throw new Error("Aucune donnée à mettre à jour.");
      }

      values.push(id);

      const sql = `UPDATE characters SET ${fields.join(", ")} WHERE id = ?`;
      const result = await db.execute(sql, values);
      return result;
    } catch (error) {
      throw new Error(
        "Erreur lors de la modification du personnage: " + error.message
      );
    }
  }

  static async delete(id) {
    try {
      const result = await db.execute("DELETE FROM characters WHERE id = ?", [
        id,
      ]);
      return result;
    } catch (error) {
      throw new Error(
        "Erreur lors de la suppression du personnage: " + error.message
      );
    }
  }

  static async getTopByCriteria() {
    try {
      const query = `
        SELECT 
        c.id,
        c.name,
        c.image_url,
        c.short_desc,
        a.title as artwork_title,
        cr.label as criteria_name,
        COUNT(v.id) as vote_count
      FROM characters c
      LEFT JOIN artworks a ON c.id_artwork = a.id
      LEFT JOIN votes v ON c.id = v.id_character
      LEFT JOIN criterias cr ON v.id_criteria = cr.id
      WHERE v.id_criteria IS NOT NULL
      GROUP BY c.id, cr.id
      HAVING vote_count > 0
      ORDER BY cr.id, vote_count DESC
    `;

      const [rows] = await db.execute(query);

      const topCharacters = [];
      const criteriaMap = new Map();

      rows.forEach((row) => {
        if (!criteriaMap.has(row.criteria_name)) {
          criteriaMap.set(row.criteria_name, row);
          topCharacters.push(row);
        }
      });

      return topCharacters;
    } catch (error) {
      throw new Error("Erreur récupération top personnages : " + error.message);
    }
  }

  static async countAll() {
    try {
      const [[rows]] = await db.query(
        "SELECT COUNT(*) AS count FROM characters"
      );
      return rows.count;
    } catch (error) {
      throw new Error("Erreur lors du comptage: " + error.message);
    }
  }
}

export default Characters;
