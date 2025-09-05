import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ArtDetail() {
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchArts = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/artworks/${id}`,
          {
            credentials: "include",
          }
        );

        if (res.ok) {
          const data = await res.json();
          setArtwork(data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArts();
  }, [id]);

  if (loading) return <div>Chargement...</div>;
  if (!artwork) return <div>Œuvre non trouvé.</div>;

  return (
    <main>
      <section className="art-detail">
        <h2>Détails de l'oeuvre</h2>
        <div className="detail" key={artwork.id}>
          <h3>{artwork.title}</h3>
          <img src={artwork.image_url} alt="image de l'oeuvre" />
          <p>{artwork.description}</p>

          <div className="categories-section">
            <span>Catégories : </span>
            {artwork.categories && artwork.categories.length > 0 ? (
              <div className="categories-list">
                {artwork.categories.map((cat) => (
                  <span key={cat.id} className="category-badge">
                    {cat.categorie}
                  </span>
                ))}
              </div>
            ) : (
              <span className="no-categories">Non spécifiées</span>
            )}
          </div>

          <p>Auteur : {artwork.author}</p>
          <p>Année de publication : {artwork.product_year}</p>
        </div>
      </section>
    </main>
  );
}

export default ArtDetail;
