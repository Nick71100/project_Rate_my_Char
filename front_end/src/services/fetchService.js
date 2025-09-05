const API_URL = import.meta.env.VITE_API_URL;

export const fetchCharacters = async () => {
  const res = await fetch(`${API_URL}/characters`, { credentials: "include" });
  if (!res.ok)
    throw new Error("Erreur lors de la récupération des personnages");
  return await res.json();
};

export const fetchCriteria = async () => {
  const res = await fetch(`${API_URL}/criteria`, { credentials: "include" });
  if (!res.ok) throw new Error("Erreur lors de la récupération des critères");
  return await res.json();
};

export const fetchUser = async () => {
  const res = await fetch(`${API_URL}/users/dashboard`, {
    credentials: "include",
  });
  if (!res.ok)
    throw new Error("Erreur lors de la récupération de l'utilisateur");
  return await res.json();
};

export const fetchVotes = async () => {
  const res = await fetch(`${API_URL}/votes/my-votes`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Erreur lors de la récupération des votes");
  return await res.json();
};

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
