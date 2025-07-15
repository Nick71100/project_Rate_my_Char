import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Artworks() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/artworks`, {
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setArtworks(data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArts();
  }, []);

  if (loading) return <div>Chargement...</div>;

  return (
    <main>
      <section className="artworks">
        <h2>Liste des oeuvres</h2>
        <div className="cards">
          {artworks.map((art) => (
            <div className="card" key={art.id}>
              <Link to={`/artworks/${art.id}`}>
                <h3>{art.title}</h3>
                <img src={art.image_url} alt="image de l'oeuvre" />
                <p>Auteur : {art.author}</p>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Artworks;
