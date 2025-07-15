import { useEffect, useState } from "react";

const criteriaLabels = {
  1: "Le plus fort",
  2: "Le plus stylé",
  3: "Le plus intelligent",
  4: "La meilleure personnalité",
};

const Rankings = () => {
  const [rankings, setRankings] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllRankings = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/votes/rankings`
        );
        if (!res.ok) throw new Error("Erreur récupération des classements");
        const data = await res.json();
        setRankings(data);
      } catch (err) {
        console.error("Erreur fetch classement :", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllRankings();
  }, []);

  if (loading) return <div>Chargement des classements...</div>;

  return (
    <main className="rankings">
      <h2>Classements par critère</h2>

      {Object.keys(criteriaLabels).map((criterionId) => (
        <section key={criterionId} className="ranking">
          <h3>{criteriaLabels[criterionId]}</h3>
          <ul>
            {(rankings[criterionId] || []).map((entry, index) => (
              <li key={entry.character_id} className="classement-item">
                <span className="position">{index + 1}.</span>
                <span className="character">{entry.character_name}</span>
                <span className="votes">{entry.vote_count} vote(s)</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
};

export default Rankings;
