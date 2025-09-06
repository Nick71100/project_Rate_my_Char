import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Characters() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChars = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/characters`);

        if (res.ok) {
          const data = await res.json();
          setCharacters(data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchChars();
  }, []);

  const getGenderBadgeClass = (gender) => {
    const genderLower = gender?.toLowerCase() || "";

    if (
      genderLower.includes("homme") ||
      genderLower.includes("masculin") ||
      genderLower === "m"
    ) {
      return "badge-gender--male";
    } else if (
      genderLower.includes("femme") ||
      genderLower.includes("féminin") ||
      genderLower === "f"
    ) {
      return "badge-gender--female";
    } else if (
      genderLower.includes("autre") ||
      genderLower.includes("non-binaire") ||
      genderLower.includes("neutre")
    ) {
      return "badge-gender--other";
    } else {
      return "badge-gender--unspecified";
    }
  };

  if (loading) return <div>Chargement...</div>;

  return (
    <main>
      <section className="characters">
        <h2>Liste des personnages</h2>
        <div className="cards">
          {characters.map((char) => (
            <div className="card" key={char.id}>
              <Link to={`/characters/${char.id}`}>
                <h3>{char.name}</h3>
                <img
                  src={char.image_url}
                  alt={`Image de ${char.name}`}
                  onError={(e) => {
                    e.target.src = "/default-character.png";
                  }}
                />
                <p>Œuvre : {char.artwork_title || "Non spécifiée"}</p>
                <div className="gender-section">
                  <span>Genre : </span>
                  <span className={getGenderBadgeClass(char.gender_label)}>
                    {char.gender_label || "Non spécifié"}
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Characters;
