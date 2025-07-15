import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Characters() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChars = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/characters`, {
          credentials: "include",
        });

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
                <img src={char.image_url} alt="image du personnage" />
                <p>{char.short_desc}</p>
                <p>Oeuvre : {char.id_artwork}</p>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Characters;
