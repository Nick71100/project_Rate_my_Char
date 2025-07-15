import Criteria from "../models/criteria.model.js";

const getAllCriteria = async (req, res) => {
  try {
    const criterias = await Criteria.getAll();
    res.status(200).json(criterias);
  } catch (error) {
    console.error("Erreur récupération des critères :", error);
    res.status(500).json({
      error: "Erreur serveur lors de la récupération des critères",
    });
  }
};

export { getAllCriteria };
