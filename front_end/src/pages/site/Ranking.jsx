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

          {(rankings[criterionId] || []).length > 0 ? (
            <div className="ranking-table">
              <div className="ranking-header">
                <div>Position</div>
                <div>Personnage</div>
                <div>Votes</div>
              </div>

              <ul>
                {(rankings[criterionId] || []).map((entry, index) => (
                  <li key={entry.character_id}>
                    <div className={`rank-position rank-${index + 1}`}>
                      {index + 1}
                    </div>

                    <div className="character-name">{entry.character_name}</div>

                    <div className="score">
                      <div className="vote-count">{entry.vote_count}</div>
                      <div className="vote-label">
                        vote{entry.vote_count > 1 ? "s" : ""}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="empty-ranking">
              <div className="empty-icon">🏆</div>
              <div className="empty-title">Aucun vote pour ce critère</div>
              <div className="empty-message">
                Soyez le premier à voter pour établir le classement !
              </div>
            </div>
          )}
        </section>
      ))}
    </main>
  );
};

export default Rankings;
