import { useEffect, useState } from "react";
import { toast } from "sonner";
import AddArtworkModal from "../../components/modals/AddArtworkModal";
import EditArtworkModal from "../../components/modals/EditArtworkModal";

const ArtsAdmin = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  const fetchArts = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/artworks`,
        {
          credentials: "include",
        }
      );

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

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/categories`);
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error("Erreur récupération catégories :", err);
    }
  };

  useEffect(() => {
    fetchArts();
    fetchCategories();
  }, []);

  const handleAddSuccess = () => {
    setShowAddModal(false);
    fetchArts();
  };

  const handleDeleteArtwork = async (id) => {
    const confirm = window.confirm("Supprimer cette oeuvre ?");

    const toastId = toast.loading("Ajout en cours...");

    if (!confirm) return;

    try {
      const response = await fetch(`http://localhost:3000/artworks/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Échec de la suppression");
      }
      setArtworks((prev) => prev.filter((arts) => arts.id !== id));
      toast.success(`Oeuvre supprimée !`, {
        id: toastId,
        style: {
          background: "#27ae60",
          color: "white",
        },
      });
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      toast.error("Échec de la suppression de l'oeuvre !", {
        id: toastId,
        style: {
          background: "red",
          color: "white",
        },
      });
    }
  };

  if (loading) return <div>Chargement...</div>;

  return (
    <main className="admin-main">
      <section>
        <h3>Oeuvres</h3>
        <button onClick={() => setShowAddModal(true)}>Ajouter</button>
        <div className="admin-arts">
          <div className="admin-cards">
            {artworks.map((arts) => (
              <div className="admin-card" key={arts.id}>
                <p>- {arts.title}</p>
                <p>id : {arts.id}</p>
                <p>Catégorie : {arts.id_categorie}</p>
                <p>Auteur : {arts.author}</p>
                <p>Année{arts.product_year}</p>
                <button onClick={() => setSelectedArtwork(arts)}>
                  Modifier
                </button>
                <button onClick={() => handleDeleteArtwork(arts.id)}>
                  Supprimer
                </button>
              </div>
            ))}
          </div>
        </div>

        {showAddModal && (
          <AddArtworkModal
            onCancel={() => setShowAddModal(false)}
            onAddSuccess={handleAddSuccess}
          />
        )}

        {selectedArtwork && (
          <EditArtworkModal
            artwork={selectedArtwork}
            onCancel={() => setSelectedArtwork(null)}
            onEditSuccess={() => {
              fetchArts();
              setSelectedArtwork(null);
            }}
          />
        )}
      </section>
    </main>
  );
};

export default ArtsAdmin;
