import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ArtDetail() {
  const [artwork, setArtwork] = useState([]);
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
  if (!artwork) return <div>Personnage non trouvé.</div>;

  return (
    <main>
      <section className="art-detail">
        <h2>Détails de l'oeuvre</h2>
        <div className="detail" key={artwork.id}>
          <h3>{artwork.title}</h3>
          <img src={artwork.image_url} alt="image de l'oeuvre" />
          <p>{artwork.description}</p>
          <p>Catégorie : {artwork.id_categorie}</p>
          <p>Auteur : {artwork.author}</p>
          <p>Année de publication : {artwork.product_year}</p>
        </div>
      </section>
    </main>
  );
}

export default ArtDetail;
