import Users from "../models/user.model.js";
import Characters from "../models/characters.model.js";
import Artwork from "../models/artwork.model.js";

const getStats = async (req, res) => {
  try {
    const [users, characters, artworks] = await Promise.all([
      Users.countAll(),
      Characters.countAll(),
      Artwork.countAll(),
    ]);
    res.json({
      users,
      characters,
      artworks,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Erreur lors de la récupération des statistiques",
    });
  }
};

export { getStats };
