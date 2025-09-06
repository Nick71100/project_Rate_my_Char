import Votes from "../models/votes.model.js";

const castVote = async (req, res) => {
  try {
    const userId = req.user?.id;
    const votes = req.body.votes;

    if (!userId || !Array.isArray(votes)) {
      return res.status(400).json({ message: "Données invalides." });
    }

    for (const vote of votes) {
      const { id_character, id_criteria } = vote;

      if (!id_character || !id_criteria) {
        return res.status(400).json({
          message:
            "Chaque vote doit contenir un id_character et un id_criteria.",
        });
      }

      const existingVote = await Votes.findUserVote(userId, id_criteria);

      if (existingVote) {
        await Votes.updateVote(existingVote.id, id_character);
      } else {
        await Votes.createVote(userId, id_character, id_criteria);
      }
    }

    res.status(200).json({ message: "Votes enregistrés avec succès." });
  } catch (error) {
    console.error("Erreur vote :", error);
    res.status(500).json({ message: error.message });
  }
};

const getUserVotes = async (req, res) => {
  try {
    const votes = await Votes.getVotesByUser(req.user.id);
    res.status(200).json(votes);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération des votes" });
  }
};

const getRankingByCriterion = async (req, res) => {
  const { criterionId } = req.params;
  try {
    const ranking = await Votes.getRankingByCriterion(criterionId);
    res.status(200).json(ranking);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors du classement." });
  }
};

const getAllRankings = async (req, res) => {
  try {
    const rankings = await Votes.getAllRankings();

    const grouped = rankings.reduce((acc, row) => {
      const { id_criteria, character_name, character_id, vote_count } = row;
      if (!acc[id_criteria]) acc[id_criteria] = [];
      acc[id_criteria].push({ character_id, character_name, vote_count });
      return acc;
    }, {});

    res.status(200).json(grouped);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des classements." });
  }
};

export { castVote, getUserVotes, getRankingByCriterion, getAllRankings };
