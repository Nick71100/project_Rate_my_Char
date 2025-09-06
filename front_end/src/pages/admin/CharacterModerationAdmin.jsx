import { useState, useEffect } from "react";
import { toast } from "sonner";

const CharacterModerationAdmin = () => {
  const [pendingCharacters, setPendingCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState({});

  useEffect(() => {
    fetchPendingCharacters();
  }, []);

  const fetchPendingCharacters = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/characters/pending`,
        {
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        setPendingCharacters(data);
      } else {
        toast.error("Erreur lors du chargement");
      }
    } catch (error) {
      console.error("Erreur:", error);
      toast.error("Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (characterId) => {
    setProcessing((prev) => ({ ...prev, [characterId]: true }));

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/admin/characters/${characterId}/approve`,
        {
          method: "PUT",
          credentials: "include",
        }
      );

      if (response.ok) {
        toast.success("Personnage approuvé avec succès !");
        setPendingCharacters((prev) =>
          prev.filter((char) => char.id !== characterId)
        );
      } else {
        const data = await response.json();
        toast.error(data.message || "Erreur lors de l'approbation");
      }
    } catch (error) {
      console.error("Erreur:", error);
      toast.error("Erreur de connexion");
    } finally {
      setProcessing((prev) => ({ ...prev, [characterId]: false }));
    }
  };

  const handleReject = async (characterId) => {
    const confirmReject = window.confirm(
      "Êtes-vous sûr de vouloir rejeter ce personnage ?"
    );
    if (!confirmReject) return;

    setProcessing((prev) => ({ ...prev, [characterId]: true }));

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/admin/characters/${characterId}/reject`,
        {
          method: "PUT",
          credentials: "include",
        }
      );

      if (response.ok) {
        toast.success("Personnage rejeté");
        setPendingCharacters((prev) =>
          prev.filter((char) => char.id !== characterId)
        );
      } else {
        const data = await response.json();
        toast.error(data.message || "Erreur lors du rejet");
      }
    } catch (error) {
      console.error("Erreur:", error);
      toast.error("Erreur de connexion");
    } finally {
      setProcessing((prev) => ({ ...prev, [characterId]: false }));
    }
  };

  if (loading) {
    return (
      <main className="admin-main">
        <div>Chargement des personnages en attente...</div>
      </main>
    );
  }

  return (
    <main className="admin-main">
      <h2>Modération des personnages</h2>

      {pendingCharacters.length === 0 ? (
        <div className="no-pending">
          <p>Aucun personnage en attente de validation !</p>
        </div>
      ) : (
        <div className="moderation-section">
          <div className="pending-count">
            <span className="badge">{pendingCharacters.length}</span>
            personnage{pendingCharacters.length > 1 ? "s" : ""} en attente
          </div>

          <div className="pending-characters">
            {pendingCharacters.map((char) => (
              <div key={char.id} className="character-card pending">
                <div className="character-info">
                  <div className="character-header">
                    <h3>{char.name}</h3>
                    <span className="submitted-date">
                      Soumis le{" "}
                      {new Date(char.submitted_at).toLocaleDateString("fr-FR")}
                    </span>
                  </div>

                  <div className="character-details">
                    <div className="detail-row">
                      <strong>Créateur:</strong>{" "}
                      {char.creator_username || "Utilisateur supprimé"}
                    </div>
                    <div className="detail-row">
                      <strong>Œuvre:</strong>{" "}
                      {char.artwork_title || "Non spécifiée"}
                    </div>
                    <div className="detail-row">
                      <strong>Genre:</strong>{" "}
                      {char.gender_label || "Non spécifié"}
                    </div>
                  </div>

                  <div className="descriptions">
                    {char.long_desc && (
                      <div className="long-desc">
                        <strong>Description détaillée:</strong>
                        <p>{char.long_desc}</p>
                      </div>
                    )}
                  </div>

                  {char.image_url && (
                    <div className="character-image">
                      <strong>Image:</strong>
                      <div className="image-preview">
                        <img
                          src={char.image_url}
                          alt={char.name}
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "block";
                          }}
                        />
                        <div
                          className="image-error"
                          style={{ display: "none" }}
                        >
                          Image non accessible
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="character-actions">
                  <button
                    className="approve-btn"
                    onClick={() => handleApprove(char.id)}
                    disabled={processing[char.id]}
                  >
                    {processing[char.id] ? "..." : " Approuver"}
                  </button>

                  <button
                    className="reject-btn"
                    onClick={() => handleReject(char.id)}
                    disabled={processing[char.id]}
                  >
                    {processing[char.id] ? "..." : " Rejeter"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
};

export default CharacterModerationAdmin;
