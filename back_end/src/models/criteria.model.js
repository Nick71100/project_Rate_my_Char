import db from "../config/db.js";

class Criteria {
  static async getAll() {
    try {
      const [result] = await db.query("SELECT * FROM criterias");
      return result;
    } catch (error) {
      throw new Error(
        "Erreur lors de la récupération des critères : " + error.message
      );
    }
  }
}

export default Criteria;
