const API_URL = import.meta.env.VITE_API_URL;

export const fetchTopCharacters = async () => {
  try {
    const res = await fetch(`${API_URL}/characters/top-by-criteria`, {
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error(`Erreur HTTP: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Erreur récupération top personnages:", error);
    return [];
  }
};

export const fetchRankingByCriteria = async (criteriaId) => {
  try {
    const res = await fetch(`${API_URL}/characters/ranking/${criteriaId}`, {
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error(`Erreur HTTP: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Erreur récupération classement:", error);
    return [];
  }
};

export const fetchCharacterStats = async (characterId) => {
  try {
    const res = await fetch(`${API_URL}/characters/${characterId}/stats`, {
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error(`Erreur HTTP: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Erreur récupération stats:", error);
    return [];
  }
};
