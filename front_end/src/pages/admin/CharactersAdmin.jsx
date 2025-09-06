import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddCharacterModal from "../../components/modals/AddChararcterModal";
import EditCharacterModal from "../../components/modals/EditCharacterModal";

const CharsAdmin = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddCharModal, setShowAddCharModal] = useState(false);
  const [editChar, setEditChar] = useState(null);
  const [genders, setGenders] = useState([]);
  const [artworks, setArtworks] = useState([]);
  const [pendingCount, setPendingCount] = useState(0);

  const fetchChars = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/characters`,
        {
          credentials: "include",
        }
      );

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
  useEffect(() => {
    const fetchGendersAndArtworks = async () => {
      try {
        const [gRes, aRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/genders`),
          fetch(`${import.meta.env.VITE_API_URL}/artworks`),
        ]);

        if (gRes.ok) {
          const gendersData = await gRes.json();
          setGenders(gendersData);
        }

        if (aRes.ok) {
          const artworksData = await aRes.json();
          setArtworks(artworksData);
        }
      } catch (err) {
        console.error("Erreur lors du chargement des genres et œuvres", err);
      }
    };

    const fetchPendingCount = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/admin/characters/pending`
        );
        if (res.ok) {
          const data = await res.json();
          setPendingCount(data.length);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchChars();
    fetchGendersAndArtworks();
    fetchPendingCount();
  }, []);

  const handleUpdateSuccess = () => {
    setEditChar(null);
    fetchChars();
  };

  const handleDeleteCharacter = async (id) => {
    const confirm = window.confirm("Supprimer ce personnage ?");
    if (!confirm) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/characters/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Échec de la suppression");
      }
      setCharacters((prev) => prev.filter((char) => char.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  if (loading) return <div>Chargement...</div>;

  return (
    <main className="admin-main">
      <h3>Personnages</h3>
      <section>
        <div className="admin-chars">
          <div className="admin-options">
            <button type="button" onClick={() => setShowAddCharModal(true)}>
              Ajouter
            </button>

            <Link to="/admin/moderation">
              Modérer personnages
              {pendingCount > 0 && (
                <span className="badge">{pendingCount}</span>
              )}
            </Link>
          </div>

          <div className="admin-cards">
            {characters.map((char) => (
              <div className="admin-card" key={char.id}>
                <div className="char-header">
                  {" "}
                  <p>- {char.name}</p>
                  {char.status === "pending" && (
                    <span className="badge pending">En attente</span>
                  )}
                  {char.status === "approved" && (
                    <span className="badge approved">Approuvé</span>
                  )}
                  {char.status === "rejected" && (
                    <span className="badge rejected">Rejeté</span>
                  )}
                  {!char.status && (
                    <span className="badge unknown">Statut inconnu</span>
                  )}
                </div>
                <p>id : {char.id}</p>
                <p>Genre : {char.id_gender}</p>
                <p>Oeuvre : {char.id_artwork}</p>
                <Link to="/characters/details">Détails</Link>
                <button onClick={() => setEditChar(char)}>Modifier</button>
                <button onClick={() => handleDeleteCharacter(char.id)}>
                  Supprimer
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {showAddCharModal && (
        <AddCharacterModal
          onCancel={() => setShowAddCharModal(false)}
          onAddSuccess={(newCharacter) => {
            setCharacters((prev) => [...prev, newCharacter]);
            setShowAddCharModal(false);
          }}
        />
      )}

      {editChar && (
        <EditCharacterModal
          character={editChar}
          genders={genders}
          artworks={artworks}
          onCancel={() => setEditChar(null)}
          onUpdateSuccess={handleUpdateSuccess}
        />
      )}
    </main>
  );
};

export default CharsAdmin;
