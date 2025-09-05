import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function CharDetail() {
  const [character, setCharacter] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchChars = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/characters/${id}`,
          {
            credentials: "include",
          }
        );

        if (res.ok) {
          const data = await res.json();
          setCharacter(data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchChars();
  }, [id]);

  if (loading) return <div>Chargement...</div>;
  if (!character) return <div>Personnage non trouvé.</div>;

  return (
    <main>
      <section className="char-detail">
        <h2>Détails du personnages</h2>
        <div className="detail" key={character.id}>
          <h3>{character.name}</h3>
          <img src={character.image_url} alt={`Image de ${character.name}`} />
          <p>{character.long_desc}</p>
          <p>Œuvre : {character.artwork_title || "Non spécifiée"}</p>
          <p>Genre : {character.gender_label || "Non spécifié"}</p>
          <p>
            Ajouté par : {character.creator_username || "Utilisateur supprimé"}
          </p>
          {character.votes && character.votes.length > 0 && (
            <div className="votes-section">
              <h4>Votes par critère :</h4>
              {character.votes.map((vote) => (
                <p key={vote.criteria_name}>
                  {vote.criteria_name} : {vote.vote_count} vote(s)
                </p>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default CharDetail;
